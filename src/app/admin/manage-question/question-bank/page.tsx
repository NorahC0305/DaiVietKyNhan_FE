export const dynamic = 'force-dynamic';

import QuestionBankPage from "@pages/Admin/Question/QuestionBank";
import kyNhanSummaryService from "@services/ky-nhan-summary";
import landService from "@services/land";

 async function getKyNhanSummary() {
  return await kyNhanSummaryService.getKyNhanSummary();
}

 async function getLands() {
  return await landService.getLands();
}
export default async function QuestionBankServer() {
  const kyNhanSummary = await getKyNhanSummary();
  const lands = await getLands();

  return (
    <>
      <QuestionBankPage kyNhanSummary={kyNhanSummary.data?.results || []} lands={lands.data?.results || []} />
    </>
  );
}
