import { Bell, X, Calendar, Mail, MessageSquare } from "lucide-react";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    icon: Mail,
    title: "New message from LinkedIn",
    message: "Someone viewed your profile",
    time: "5 minutes ago",
  },
  {
    icon: Calendar,
    title: "Calendar reminder",
    message: "Team meeting in 30 minutes",
    time: "15 minutes ago",
  },
  {
    icon: MessageSquare,
    title: "Comment on your project",
    message: "Great work on the portfolio!",
    time: "1 hour ago",
  },
];

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
        data-testid="notification-backdrop"
      />
      <div 
        className="fixed bottom-20 right-4 w-96 bg-card/70 backdrop-blur-3xl border border-card-border rounded-lg shadow-2xl z-50"
        data-testid="notification-center"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-md hover-elevate flex items-center justify-center"
            data-testid="button-close-notifications"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-auto">
          {notifications.map((notification, index) => (
            <button
              key={index}
              className="w-full p-4 flex items-start gap-3 hover-elevate border-b border-border last:border-b-0"
              onClick={() => console.log(`Notification clicked: ${notification.title}`)}
              data-testid={`notification-${index}`}
            >
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <notification.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold mb-0.5">{notification.title}</p>
                <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border">
          <button className="w-full text-sm text-primary font-medium hover-elevate py-2 rounded-md" data-testid="button-clear-all">
            Clear all notifications
          </button>
        </div>
      </div>
    </>
  );
}
