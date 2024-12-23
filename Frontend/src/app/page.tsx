"use server";

import { redirect } from "next/navigation";
import getSession from "./actions/getSession";

const HomePage = async () => {
  const session = await getSession();

  const name = session?.user?.name;
  const email = session?.user?.email;

  if (!email || !name) {
    redirect("/log-in");
  } else {
    redirect("/dashboard");
  }
};

export default HomePage;
