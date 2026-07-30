// src/components/admin/PipelineStepper.tsx
import { LEAD_PIPELINE, LEAD_STATUS_LABELS, type LeadStatus } from '@/types/crm';
import { cn } from '@/lib/utils';

export function PipelineStepper({ current }: { current: LeadStatus }) {
  const idx = LEAD_PIPELINE.indexOf(current);
  return (
    <ol className="flex flex-wrap gap-2">
      {LEAD_PIPELINE.map((status, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li key={status} className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold',
                active && 'border-primary bg-primary text-primary-foreground',
                done && 'border-verified/30 bg-verified/10 text-verified',
                !active && !done && 'border-border text-muted-foreground',
              )}
            >
              {LEAD_STATUS_LABELS[status]}
            </span>
            {i < LEAD_PIPELINE.length - 1 && <span className="text-border">→</span>}
          </li>
        );
      })}
    </ol>
  );
}
