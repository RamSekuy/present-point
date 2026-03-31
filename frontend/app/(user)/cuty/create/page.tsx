import CutyCreateForm from "@/components/form/cutyCreateForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <section className="px-2 md:px-4 py-4">
      <Card>
        <CardContent>
          <CutyCreateForm />
        </CardContent>
      </Card>
    </section>
  );
}
