"use client";

import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { Program } from "@/types/resume";

// 입력 중인 행 (id가 null이면 새로 추가하는 행)
interface Draft {
  id: string | null;
  position: string;
  name: string;
  description: string;
  url: string;
}

const TABLE = "resume_programs";
const isHttpUrl = (v: string) => /^https?:\/\//i.test(v);
const inputClass =
  "border-border bg-background w-full rounded-md border px-2 py-1.5 text-sm focus-visible:outline-2";
const btnClass = "border-border hover:bg-card rounded-md border px-3 py-1.5 text-sm font-medium";
const primaryBtnClass =
  "bg-accent rounded-md px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 dark:text-neutral-950";

export default function ProgramsManager() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  // 쓰기 권한은 DB의 RLS 정책(app_metadata.role = 'admin')이 최종 결정한다.
  // 여기서는 편집 UI를 보여줄지 판단하는 용도로만 사용한다.
  const isAdmin = session?.user?.app_metadata?.role === "admin";

  const load = useCallback(async () => {
    if (!supabase) {
      setError("데이터베이스 설정이 되어 있지 않습니다.");
      setLoading(false);
      return;
    }
    const { data, error: err } = await supabase
      .from(TABLE)
      .select("id, position, name, description, url")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });
    if (err) setError("목록을 불러오지 못했습니다.");
    else {
      setError("");
      setPrograms(data as Program[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 시 외부 데이터 로딩
    void load();
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoginError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    setPassword("");
    setShowLogin(false);
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    setDraft(null);
  };

  const startAdd = () => {
    const next = programs.reduce((m, p) => Math.max(m, p.position), 0) + 1;
    setDraft({ id: null, position: String(next), name: "", description: "", url: "" });
  };

  const startEdit = (p: Program) =>
    setDraft({
      id: p.id,
      position: String(p.position),
      name: p.name,
      description: p.description,
      url: p.url,
    });

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase || !draft) return;
    const name = draft.name.trim();
    const url = draft.url.trim();
    const position = Number.parseInt(draft.position, 10);
    if (!name) return setError("프로그램명을 입력해 주세요.");
    if (Number.isNaN(position)) return setError("순서는 숫자로 입력해 주세요.");
    if (url && !isHttpUrl(url))
      return setError("웹페이지 주소는 http:// 또는 https://로 시작해야 합니다.");

    setSaving(true);
    const row = { position, name, description: draft.description.trim(), url };
    const { error: err } = draft.id
      ? await supabase
          .from(TABLE)
          .update({ ...row, updated_at: new Date().toISOString() })
          .eq("id", draft.id)
      : await supabase.from(TABLE).insert(row);
    setSaving(false);
    if (err) return setError("저장하지 못했습니다. 관리자 로그인 상태를 확인해 주세요.");
    setDraft(null);
    await load();
  };

  const remove = async (p: Program) => {
    if (!supabase || !window.confirm(`"${p.name}" 항목을 삭제할까요?`)) return;
    const { error: err } = await supabase.from(TABLE).delete().eq("id", p.id);
    if (err) return setError("삭제하지 못했습니다.");
    await load();
  };

  const editingRow = draft ? (
    <tr className="bg-card align-top">
      <td className="p-2">
        <label className="sr-only" htmlFor="f-position">
          순서
        </label>
        <input
          id="f-position"
          type="number"
          className={`${inputClass} w-20`}
          value={draft?.position}
          onChange={(e) => setDraft({ ...draft, position: e.target.value })}
        />
      </td>
      <td className="p-2">
        <label className="sr-only" htmlFor="f-name">
          프로그램명
        </label>
        <input
          id="f-name"
          required
          maxLength={100}
          className={inputClass}
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
      </td>
      <td className="p-2">
        <label className="sr-only" htmlFor="f-desc">
          프로그램 설명
        </label>
        <textarea
          id="f-desc"
          rows={2}
          maxLength={1000}
          className={inputClass}
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
      </td>
      <td className="p-2">
        <label className="sr-only" htmlFor="f-url">
          웹페이지 주소
        </label>
        <input
          id="f-url"
          type="url"
          placeholder="https://"
          className={inputClass}
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        />
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <button type="submit" className={primaryBtnClass} disabled={saving}>
            {saving ? "저장 중…" : "저장"}
          </button>
          <button type="button" className={btnClass} onClick={() => setDraft(null)}>
            취소
          </button>
        </div>
      </td>
    </tr>
  ) : null;

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted text-sm">총 {programs.length}개</p>
        {isAdmin ? (
          <div className="flex gap-2">
            <button type="button" className={primaryBtnClass} onClick={startAdd} disabled={!!draft}>
              + 프로그램 추가
            </button>
            <button type="button" className={btnClass} onClick={signOut}>
              로그아웃
            </button>
          </div>
        ) : session ? (
          <div className="flex items-center gap-2">
            <span className="text-muted text-sm">편집 권한이 없는 계정입니다.</span>
            <button type="button" className={btnClass} onClick={signOut}>
              로그아웃
            </button>
          </div>
        ) : (
          <button type="button" className={btnClass} onClick={() => setShowLogin((v) => !v)}>
            관리자 로그인
          </button>
        )}
      </div>

      {showLogin && !session ? (
        <form
          onSubmit={signIn}
          className="border-border bg-card no-print mb-6 grid gap-3 rounded-xl border p-4 sm:grid-cols-3"
        >
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="username"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className={primaryBtnClass}>
              로그인
            </button>
          </div>
          {loginError ? (
            <p role="alert" className="text-sm text-red-600 sm:col-span-3 dark:text-red-400">
              {loginError}
            </p>
          ) : null}
        </form>
      ) : null}

      {error ? (
        <p role="alert" className="mb-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <form onSubmit={save}>
        <div className="border-border bg-card/70 overflow-x-auto rounded-xl border backdrop-blur-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">어플 개발 프로그램 목록</caption>
            <thead className="border-border border-b">
              <tr>
                <th scope="col" className="w-24 p-3 font-semibold">
                  순서
                </th>
                <th scope="col" className="w-48 p-3 font-semibold">
                  프로그램명
                </th>
                <th scope="col" className="p-3 font-semibold">
                  프로그램 설명
                </th>
                <th scope="col" className="w-64 p-3 font-semibold">
                  웹페이지 주소
                </th>
                {isAdmin ? (
                  <th scope="col" className="no-print w-40 p-3 font-semibold">
                    관리
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-muted p-6 text-center">
                    불러오는 중…
                  </td>
                </tr>
              ) : null}
              {!loading && programs.length === 0 && !draft ? (
                <tr>
                  <td colSpan={5} className="text-muted p-6 text-center">
                    아직 등록된 프로그램이 없습니다.
                  </td>
                </tr>
              ) : null}
              {programs.map((p) =>
                draft?.id === p.id ? (
                  <FragmentRow key={p.id}>{editingRow}</FragmentRow>
                ) : (
                  <tr key={p.id} className="align-top">
                    <td className="p-3 font-mono">{p.position}</td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="text-muted p-3 whitespace-pre-line">{p.description}</td>
                    <td className="p-3 break-all">
                      {isHttpUrl(p.url) ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {p.url} ↗
                        </a>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    {isAdmin ? (
                      <td className="no-print p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className={btnClass}
                            onClick={() => startEdit(p)}
                            disabled={!!draft}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            className={btnClass}
                            onClick={() => remove(p)}
                            disabled={!!draft}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ),
              )}
              {draft && draft.id === null ? editingRow : null}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

// tbody 안에서 key를 붙이기 위한 단순 래퍼
function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
