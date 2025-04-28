
import { supabase } from "@/integrations/supabase/client";

// Track screen time sessions
interface ScreenTimeSession {
  id: string | null;
  section: string;
  startTime: Date;
}

// Store the current active session
let activeSession: ScreenTimeSession | null = null;

/**
 * Start tracking screen time for a specific section
 * @param section The section name (e.g., 'meditation', 'journal', 'sleep')
 * @returns The session ID if successful, null otherwise
 */
export const startScreenTimeTracking = async (section: string): Promise<string | null> => {
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("User not authenticated, skipping screen time tracking");
      return null;
    }
    
    // End any existing session first
    if (activeSession) {
      await endScreenTimeTracking();
    }
    
    console.log(`Starting screen time tracking for section: ${section}`);
    
    const { data, error } = await supabase
      .from('screen_time')
      .insert({
        user_id: user.id,
        section: section,
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error starting screen time tracking:", error);
      return null;
    }
    
    // Store the active session
    activeSession = {
      id: data.id,
      section: section,
      startTime: new Date()
    };
    
    return data.id;
  } catch (err) {
    console.error("Failed to start screen time tracking:", err);
    return null;
  }
};

/**
 * End the current screen time tracking session
 * @returns boolean indicating success or failure
 */
export const endScreenTimeTracking = async (): Promise<boolean> => {
  try {
    if (!activeSession || !activeSession.id) {
      console.log("No active session to end");
      return false;
    }
    
    console.log(`Ending screen time tracking for section: ${activeSession.section}`);
    
    const { error } = await supabase
      .from('screen_time')
      .update({
        end_time: new Date().toISOString()
      })
      .eq('id', activeSession.id);
      
    if (error) {
      console.error("Error ending screen time tracking:", error);
      return false;
    }
    
    // Clear the active session
    activeSession = null;
    return true;
  } catch (err) {
    console.error("Failed to end screen time tracking:", err);
    return false;
  }
};

/**
 * Get screen time statistics for the current user
 * @returns Summary statistics for user's screen time
 */
export const getScreenTimeStats = async () => {
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("User not authenticated, cannot retrieve stats");
      return null;
    }
    
    const { data, error } = await supabase
      .from('user_section_summary')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error("Error fetching screen time stats:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Failed to get screen time stats:", err);
    return null;
  }
};
