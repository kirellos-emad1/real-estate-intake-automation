import "server-only"
import { createClient } from "@/utils/supabase/server";

export const getLeadsData = async (page: number = 1) => {
  const supabase = await createClient();
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("leads")
    .select("*", { count: "exact" }) 
    .range(from, to);

  if (error) {
    console.error("Error fetching leads:", error);
    return { data: [], hasMore: false };
  }

  const hasMore = to + 1 < (count ?? 0);

  return { data, hasMore };
};
