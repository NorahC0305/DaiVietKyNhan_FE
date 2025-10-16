import { ITestHomeResponseModel } from "@models/test-home/response";
import EntryTestPage from "@pages/Starter/Entry-test";
import testHomeService from "@services/test-home";

async function getTestHome() {
  const testHome = await testHomeService.getTestHome();
  return testHome;
}

export default async function EntryTest() {
  const testHome = (await getTestHome()) as ITestHomeResponseModel;
  return <EntryTestPage testHome={testHome.data?.results || []} />;
}
