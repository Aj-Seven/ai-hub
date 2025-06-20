import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Tips() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-500">
          <Sparkles className="h-5 w-5" />
          <span>Pro Tips</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">📝 Better Input</h4>
            <ul className="space-y-1 ">
              <li>• Be specific about your requirements</li>
              <li>• Include context and target audience</li>
              <li>• Mention desired tone and style</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">⚡ Best Results</h4>
            <ul className="space-y-1 ">
              <li>• Review and edit the generated content</li>
              <li>• Try different providers for variety</li>
              <li>• Combine multiple generations for best output</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🔧 AI Providers</h4>
            <ul className="space-y-1 ">
              <li>• OpenAI: Best for general content</li>
              <li>• Claude: Excellent for analysis</li>
              <li>• Gemini: Great for creative writing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
