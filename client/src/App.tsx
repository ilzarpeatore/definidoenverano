import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieBanner from "./components/CookieBanner";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResults from "./pages/AssessmentResults";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import LegalNotice from "./pages/LegalNotice";
import InformedConsent from "./pages/InformedConsent";
import RefundPolicy from "./pages/RefundPolicy";
import Guide7Mistakes from "./pages/Guide7Mistakes";
import CostCalculator from "./pages/CostCalculator";
import CervicalExercisesGuide from "./pages/CervicalExercisesGuide";
import PosturalChecklistHome from "./pages/PosturalChecklistHome";

import FreeWeekLanding from "./pages/FreeWeekLanding";
import FreeWeekAccess from "./pages/FreeWeekAccess";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import QuickAssessment from "./components/QuickAssessment";
import Linktree from "./pages/Linktree";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/assessment"} component={Assessment} />
      <Route path={"/assessment-results"} component={AssessmentResults} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/success"} component={Success} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/terms"} component={TermsAndConditions} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/cookies"} component={CookiePolicy} />
      <Route path={"/legal"} component={LegalNotice} />
      <Route path={"/informed-consent"} component={InformedConsent} />
      <Route path={"/refund-policy"} component={RefundPolicy} />
      <Route path={"/guide"} component={Guide7Mistakes} />
      <Route path={"/cost-calculator"} component={CostCalculator} />
      <Route path={"/cervical-exercises"} component={CervicalExercisesGuide} />
      <Route path={"/postural-checklist"} component={PosturalChecklistHome} />

      <Route path={"/free-week"} component={FreeWeekLanding} />
      <Route path={"/free-week-access"} component={FreeWeekAccess} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/quick-assessment"} component={QuickAssessment} />
      <Route path={"/links"} component={Linktree} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppButton />
          <CookieBanner />
          <ChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
