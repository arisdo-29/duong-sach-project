import { AppProvider, useApp } from '@/i18n/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { HomeStalls } from '@/screens/HomeStalls';
import { EventsCalendar } from '@/screens/EventsCalendar';
import { InteractiveMap } from '@/screens/InteractiveMap';
import { HeritageLanding } from '@/screens/HeritageLanding';
import { FeedbackForm } from '@/screens/FeedbackForm';

function ScreenRenderer() {
  const { screen } = useApp();

  switch (screen) {
    case 'home':
    case 'stalls':
      return <HomeStalls />;
    case 'events':
      return <EventsCalendar />;
    case 'map':
      return <InteractiveMap />;
    case 'heritage':
      return <HeritageLanding />;
    case 'feedback':
      return <FeedbackForm />;
    case 'chatbot':
      return <HomeStalls />;
    default:
      return <HomeStalls />;
  }
}

function AppContent() {
  const { screen } = useApp();
  const isStandalone = screen === 'heritage';

  if (isStandalone) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeritageLanding />
        <Footer />
        <ChatbotWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <ScreenRenderer />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
