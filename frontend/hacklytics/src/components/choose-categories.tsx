/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Zfy8aSe7lzY
 */
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ImageUpload() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div>Image Classification Training</div>
        <div>
          Enter the number of categories for the image classification model
          (1-10).
        </div>
      </CardHeader>
      <CardContent className="flex items-start">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="categories">Categories</Label>
          <Input
            id="categories"
            max={10}
            min={1}
            placeholder="Enter the number"
            type="number"
          />
        </div>
        <Button className="ml-2">Next</Button>
      </CardContent>
    </Card>
  );
}
