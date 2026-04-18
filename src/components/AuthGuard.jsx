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
  public: ["/story", "/pricing", "/contact"],

  // exact match only
  authOnlyExact: ["/login", "/register", "/", "/setup-password"],

  // prefix match (for dynamic routes like /resetpassword/[token])
  authOnlyPrefix: ["/resetpassword"],

  protected: ROLE_PERMISSIONS,
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
    // PUBLIC
    if (ROUTE_CONFIG.public.some((route) => pathname.startsWith(route))) {
      return "public";
    }

    // AUTH-ONLY
    if (ROUTE_CONFIG.authOnlyExact.includes(pathname)) {
      return "authOnly";
    }

    // AUTH-ONLY
    if (
      ROUTE_CONFIG.authOnlyPrefix.some((route) => pathname.startsWith(route))
    ) {
      return "authOnly";
    }

    // Otherwise protected
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

    // AUTH-ONLY
    if (routeType === "authOnly") {
      if (user) {
        router.replace("/org/dashboard");
      }
      return;
    }

    // PROTECTED
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

  // Global loading
  if (isLoading) return <Loading />;

  // PUBLIC
  if (routeType === "public") {
    return <>{children}</>;
  }

  // AUTH-ONLY
  if (routeType === "authOnly") {
    if (user) return <Loading />;
    return <>{children}</>;
  }

  // PROTECTED
  if (routeType === "protected") {
    if (!user || isError) return <Loading />;
    if (!isAllowedRoute) return <Loading />;
  }

  return <>{children}</>;
}
