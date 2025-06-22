import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { OllamaModel } from "@/types/ollama-model";
import { formatBytes } from "@/lib/utils";

export function ModelDetailsItem({ model }: { model: OllamaModel }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md p-3 bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="font-medium text-sm break-words">{model.name}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(!open)}
          className="text-xs px-2 self-start sm:self-center"
        >
          {open ? (
            <>
              Hide Details <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show Details <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {open && (
        <div className="mt-2 text-xs text-muted-foreground space-y-1 break-words">
          <p>
            <strong>Model:</strong> {model.model}
          </p>
          <p>
            <strong>Size:</strong> {formatBytes(model.size)}
          </p>
          <p>
            <strong>Modified:</strong>{" "}
            {formatDistanceToNow(new Date(model.modified_at), {
              addSuffix: true,
            })}
          </p>
          <p className="break-all">
            <strong>Digest:</strong> {model.digest}
          </p>
          {model.details && (
            <div className="mt-2 border-t pt-2 space-y-1">
              <p>
                <strong>Format:</strong> {model.details.format}
              </p>
              <p>
                <strong>Parameter Size:</strong> {model.details.parameter_size}
              </p>
              <p>
                <strong>Quantization:</strong>{" "}
                {model.details.quantization_level}
              </p>
              <p className="break-words">
                <strong>Families:</strong>{" "}
                {model.details.families?.join(", ") || "N/A"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
