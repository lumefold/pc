import PortfolioWindow from '../PortfolioWindow';

export default function PortfolioWindowExample() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <PortfolioWindow onClose={() => console.log('Portfolio window closed')} />
    </div>
  );
}
