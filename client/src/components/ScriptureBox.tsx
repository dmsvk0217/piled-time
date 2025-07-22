// components/ScriptureBox.tsx

interface ScriptureBoxProps {
  verses: string[];
  reference?: string;
}

export default function ScriptureBox({ verses, reference }: ScriptureBoxProps) {
  return (
    <div className="h-[150px] flex justify-center">
      <div className="px-4 py-6 border rounded-lg bg-gray-50 shadow-sm text-xs leading-relaxed text-gray-700 space-y-2 w-full max-w-xl">
        {verses.map((verse, i) => (
          <p key={i}>
            <span className="font-semibold">{i + 1}.</span> {verse}
          </p>
        ))}
        {reference && <p className="text-right text-xs text-gray-500">— {reference}</p>}
      </div>
    </div>
  );
}
