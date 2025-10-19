import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import KyNhanSummaryPage from "@pages/Admin/Library/KyNhanSummary";
import kynhanService from "@services/kynhan";
import { IKyNhanResponseModel } from "@models/ky-nhan/response";
import { IKyNhan } from "@models/ky-nhan/entity";

export default async function AdminKyNhanSummaryPage() {
  const session = (await getServerSession(authOptions)) as UTILS.ISession;

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Fetch kỳ nhân list for dropdown
  const kyNhanResponse =
    (await kynhanService.getKyNhan()) as IKyNhanResponseModel;
  const kyNhanList: IKyNhan[] = kyNhanResponse.data?.results || [];

  return <KyNhanSummaryPage kyNhanList={kyNhanList} />;
}
