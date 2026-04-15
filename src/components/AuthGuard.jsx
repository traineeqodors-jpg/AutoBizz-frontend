"use client";

import Loading from "@/app/loading";
import { useGetMeQuery } from "@/features/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

// Access levels mapped to specific roles
const ROLE_PERMISSIONS = {
  owner: [
    "/org/dashboard",
    "/org/documents",
    "/org/callLogs",
    "/org/employees",
    "/org/leads",
    "/org/calendar",
    "/org/sop",
    "/org/orgprofile",
  ],
  sales: [
    "/org/dashboard",
    "/org/leads",
    "/org/calendar",
    "/org/sop",
    "/org/orgprofile",
  ],
  employee: ["/org/dashboard", "/org/sop", "/org/orgprofile"],
};

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    retry: false,
  });

  const userRole = user?.data?.role;

  // Public pages that don't require an active session
  const isAuthRoute = useMemo(
    () =>
      [
        "/login",
        "/register",
        "/",
        "/resetpassword",
        "/setup-password",
      ].includes(pathname),
    [pathname],
  );

  useEffect(() => {
    if (isAuthRoute && !user) return;

    if (isLoading) return;

    // Redirect unauthenticated users back to landing page
    if ((isError || !user) && !isAuthRoute) {
      router.replace("/");
      return;
    }

    // Prevent logged-in users from seeing login/register pages
    if (user && isAuthRoute) {
      router.replace("/org/dashboard");
      return;
    }

    // Check if the user's role has permission for the current URL
    if (user && !isAuthRoute) {
      const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
      const isAllowed = allowedRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (!isAllowed) {
        router.replace("/org/dashboard");
      }
    }
  }, [user, isLoading, isError, isAuthRoute, pathname, router, userRole]);

  // Global loading state while fetching user data
  if (isLoading) return <Loading />;

  // Block the UI during logout or if the session fails on a private route
  if (!isAuthRoute && (!user || isError)) {
    return <Loading />;
  }

  // Final safety check to prevent rendering of restricted pages
  if (user && !isAuthRoute) {
    const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));
    if (!isAllowed) return <Loading />;
  }

  return <>{children}</>;
}
