import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="relative w-80" data-testid="search-box">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Type here to search"
        className="w-full h-8 pl-9 pr-3 bg-card/50 backdrop-blur-xl border border-card-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        data-testid="input-search"
      />
    </div>
  );
}
