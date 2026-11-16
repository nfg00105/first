export default function Footer({ name, lastUpdated }: { name: string; lastUpdated: string }) {
  return (
    <footer className="border-border text-muted border-t py-8 text-center text-sm">
      <p>
        © {new Date(lastUpdated).getFullYear()} {name}. All rights reserved.
      </p>
      <p className="mt-1">최종 업데이트: {lastUpdated}</p>
    </footer>
  );
}
