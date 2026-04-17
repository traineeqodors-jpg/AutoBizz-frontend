"use client";

import Loading from "@/app/loading";
import { useGetMeQuery } from "@/features/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

// Role-based permissions
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

// Central config
const ROUTE_CONFIG = {
  public: ["/story", "/pricing", "/contact"], // accessible to all
  authOnly: [
    "/login",
    "/register",
    "/",
    "/resetpassword",
    "/resetpassword/reset",
    "/setup-password",
  ], // only when NOT logged in
  protected: ROLE_PERMISSIONS, // role-based
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

  // Route type detection
  const routeType = useMemo(() => {
    if (ROUTE_CONFIG.public.some((route) => pathname.startsWith(route))) {
      return "public";
    }

    if (ROUTE_CONFIG.authOnly.some((route) => pathname === route)) {
      return "authOnly";
    }

    return "protected";
  }, [pathname]);

  // Permission check for protected routes
  const isAllowedRoute = useMemo(() => {
    if (!userRole) return false;

    const allowedRoutes = ROUTE_CONFIG.protected[userRole] || [];

    return allowedRoutes.some((route) => pathname.startsWith(route));
  }, [pathname, userRole]);

  // Navigation logic
  useEffect(() => {
    if (isLoading) return;

    // PUBLIC → allow always
    if (routeType === "public") return;

    // AUTH-ONLY (login/register)
    if (routeType === "authOnly") {
      if (user) {
        router.replace("/org/dashboard");
      }
      return;
    }

    // PROTECTED ROUTES
    if (routeType === "protected") {
      // Not logged in
      if (isError || !user) {
        router.replace("/");
        return;
      }

      // Logged in but not allowed
      if (!isAllowedRoute) {
        router.replace("/org/dashboard");
      }
    }
  }, [isLoading, isError, user, routeType, isAllowedRoute, router]);

  // Render handling

  // Global loading
  if (isLoading) return <Loading />;

  // Public → always render
  if (routeType === "public") {
    return <>{children}</>;
  }

  // Auth-only → block if logged in (redirect handled above)
  if (routeType === "authOnly") {
    if (user) return <Loading />;
    return <>{children}</>;
  }

  // Protected → block until valid
  if (routeType === "protected") {
    if (!user || isError) return <Loading />;
    if (!isAllowedRoute) return <Loading />;
  }

  return <>{children}</>;
}
