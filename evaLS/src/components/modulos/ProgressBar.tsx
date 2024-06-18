
import { Progress } from "@nextui-org/react";
import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    const currentProgress = localStorage.getItem('progress') ?? 0;
    setProgress(Number(currentProgress));
}, []);
  return (
    <Progress
      size="sm"
      radius="sm"
      classNames={{
        base: "max-w-md",
        // track: "drop-shadow-md border border-default",
        // indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        // label: "tracking-wider font-medium text-default-600",
        // value: "text-foreground/60",
      }}
      label="Progreso"
      value={progress}
      showValueLabel={true}
    />
  );
}
