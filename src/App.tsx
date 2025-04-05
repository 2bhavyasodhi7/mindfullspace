
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sleep from "./pages/Sleep";
import Meditation from "./pages/Meditation";
import StressAndAnxiety from "./pages/StressAndAnxiety";
import Journaling from "./pages/Journaling";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Rewards from "./pages/Rewards";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Yoga from "./pages/Yoga";
import AIChat from "./pages/AIChat";
import "./App.css";

// Custom styles for audio player
const customStyles = `
  .rhap_container {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }
  
  .rhap_progress-section {
    margin-bottom: 5px;
  }
  
  .rhap_progress-bar {
    height: 4px;
  }
  
  .rhap_progress-indicator {
    width: 12px;
    height: 12px;
    top: -4px;
    background-color: var(--mindful);
  }
  
  .rhap_progress-filled {
    background-color: var(--mindful);
  }
  
  .rhap_controls-section {
    margin-top: 0;
  }
  
  .rhap_main-controls-button {
    color: var(--mindful);
  }
  
  .rhap_volume-button {
    color: var(--mindful);
  }
  
  .rhap_volume-bar {
    height: 4px;
  }
  
  .rhap_volume-indicator {
    width: 12px;
    height: 12px;
    top: -4px;
    background-color: var(--mindful);
  }
  
  .article-audio-player .rhap_container {
    background-color: rgba(115, 165, 128, 0.05);
    border-radius: 8px;
    padding: 12px;
  }
  
  /* Semi-circle chart styling */
  .semi-circle-chart {
    position: relative;
    width: 120px;
    height: 60px;
    overflow: hidden;
    margin: 0 auto;
  }
  
  .semi-circle-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top-left-radius: 120px;
    border-top-right-radius: 120px;
    background-color: #f3f4f6;
  }
  
  .dark .semi-circle-background {
    background-color: #374151;
  }
  
  .semi-circle-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top-left-radius: 120px;
    border-top-right-radius: 120px;
    background: linear-gradient(to right, #73A580, #A6C1AD);
    transform-origin: bottom center;
    transform: rotate(calc(var(--percent) * 1.8deg - 90deg));
  }
  
  .semi-circle-label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 4px;
  }
  
  .semi-circle-percentage {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <style>{customStyles}</style>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sleep" element={<Sleep />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/stress-and-anxiety" element={<StressAndAnxiety />} />
                <Route path="/journaling" element={<Journaling />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/yoga" element={<Yoga />} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
