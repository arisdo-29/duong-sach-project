import { AppProvider, useApp } from '@/i18n/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { HomeStalls } from '@/screens/HomeStalls';
import { StallsPage } from '@/screens/StallsPage';
import { EventsCalendar } from '@/screens/EventsCalendar';
import { EventProposal } from '@/screens/EventProposal';
import { EventManagement } from '@/screens/EventManagement';
import { InteractiveMap } from '@/screens/InteractiveMap';
import { HeritageLanding } from '@/screens/HeritageLanding';
import { FeedbackForm } from '@/screens/FeedbackForm';

function ScreenRenderer() {
  const { screen } = useApp();

  switch (screen) {
    case 'home':
      return <HomeStalls />;
    case 'stalls':
      return <StallsPage />;
    case 'events':
      return <EventsCalendar />;
    case 'events-proposal':
      return <EventProposal />;
    case 'events-management':
      return <EventManagement />;
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

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          <ScreenRenderer />
        </main>
        <Footer />
        <ChatbotWidget />
      </div>
    </AppProvider>
  );
}
