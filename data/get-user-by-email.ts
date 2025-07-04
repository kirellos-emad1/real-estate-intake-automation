import "server-only"
import { createClient } from "@/utils/supabase/server";

export const getUserByEmail = async (email: string) => {
    const supabase = await createClient();

    const { data, error, count } = await supabase
        .from("users")
        .select("email")
        .eq('email', email)

        
    if (error) {
        console.error("Error fetching users:", error);
        return null; // or throw error
    }


    return data;
};
