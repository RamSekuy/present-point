import { axiosSSR } from "@/lib/axios.ssr";
import AttendanceTable from "./_components/attendanceTable";

export default async function Page() {
  const res = await axiosSSR().get("/attendance/me");
  const attendanceList = res.data.data;
  return <AttendanceTable data={attendanceList} />;
}
