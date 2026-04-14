"use client";

import Loading from "@/app/loading";
import { useGetMeQuery } from "@/features/slices/userSlice";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    retry: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/" ||
    pathname === "/resetpassword" ||
    pathname === "/setup-password";

  const isProtectedRoute = !isAuthRoute;

  useEffect(() => {
    if (isLoading) return;

    // Only redirect to landing if there is an error AND we are on a protected route
    if ((!user || isError) && isProtectedRoute) {
      router.replace("/");
      return;
    }

    // Only redirect to dashboard if the user is actually logged in and on an auth route
    if (user && !isError && isAuthRoute) {
      router.replace("/org/dashboard");
    }
  }, [
    user,
    isLoading,
    isError,
    pathname,
    router,
    isAuthRoute,
    isProtectedRoute,
  ]);

  // Show loader while the initial request is fetching
  if (isLoading) return <Loading />;

  // // PREVENT FLASH: If logged in but on a login/register page, show NOTHING (or loading)
  // if (user && isAuthRoute) {
  //   return <div>Stuck here</div>;
  // }

  // PREVENT FLASH: If not logged in but on a protected page, show NOTHING
  if ((!user || isError) && isProtectedRoute) {
    return <Loading />;
  }

  return <>{children}</>;
}
