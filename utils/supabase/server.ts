import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = async (cookieStore?: Awaited<ReturnType<typeof cookies>>) => {
  const resolvedCookies = cookieStore || (await cookies());

  return createServerClient(
    supabaseUrl || "",
    supabaseKey || "",
    {
      cookies: {
        getAll() {
          return resolvedCookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              resolvedCookies.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    },
  );
};
