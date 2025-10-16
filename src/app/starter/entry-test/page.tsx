import { ITestHomeResponseModel } from "@models/test-home/response";
import EntryTestPage from "@pages/Starter/Entry-test";
import testHomeService from "@services/test-home";

async function getTestHome() {
  const testHome = await testHomeService.getTestHome();
  return testHome;
}

export default async function PersonalityResult() {
  const testHome = (await getTestHome()) as ITestHomeResponseModel;
  console.log(testHome.data?.results);
  return (
    <>
      <EntryTestPage testHome={testHome.data?.results || []} />
    </>
  );
}
