import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/form/loginForm";

export default async function AuthPage() {
  return (
    <main className="container relative flex h-full min-h-dvh w-full flex-col items-start justify-center px-4 py-20 md:h-dvh xl:px-0">
      <Image
        src="/placeholder-image.jpg"
        alt="Login"
        fill
        priority
        className="object-cover brightness-50 md:hidden"
      />

      <div className="flex size-full max-w-7xl overflow-ellipsis rounded-xl md:border md:bg-background md:shadow-md">
        <div className="relative hidden size-full overflow-hidden md:block md:rounded-l-xl">
          <Image
            src="/placeholder-image.jpg"
            alt="Login"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="relative flex size-full flex-col justify-between px-6 py-8">
            <Link href={`/`} className="w-fit text-background">
              <div className="rounded-full relative w-12 aspect-square bg-transparent hover:scale-110 transition-all">
                <Image
                  src="/logo.png"
                  alt="Logo PresentPoint"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="max-w-sm self-end text-balance text-end text-background">
              &quot;Accurate and Reliable Attendance Platform&quot;
            </p>
          </div>
        </div>

        <div className="size-full md:overflow-hidden md:rounded-xl md:py-6">
          <div className="relative flex size-full items-start justify-center overflow-y-scroll md:px-6">
            <section className="relative z-40 h-fit w-full max-w-5xl space-y-4 p-4 md:h-fit md:space-y-0 md:p-0">
              <div className="flex flex-col items-center text-balance text-center md:hidden md:space-y-0">
                <Link href={`/`} className="w-fit text-background">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    height={100}
                    width={100}
                    sizes="100px"
                    className="object-contain"
                  />
                </Link>
                <p className="text-balance text-background">
                  Accurate and Reliable Attendance Platform
                </p>
              </div>

              <Tabs defaultValue="signin" className="">
                <TabsList className="sticky top-0 w-full">
                  <TabsTrigger value="signin" className="w-full">
                    Sign in
                  </TabsTrigger>
                  <TabsTrigger value="singup" className="w-full">
                    Sign up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <LoginForm />
                    </CardContent>

                    <CardFooter>
                      <CardDescription>
                        <Link href="/auth/forget-password">
                          Forget password ?
                        </Link>
                      </CardDescription>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="singup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Register your account</CardTitle>

                      <CardDescription></CardDescription>
                    </CardHeader>

                    <CardContent>
                      <LoginForm />
                    </CardContent>

                    <CardFooter></CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
