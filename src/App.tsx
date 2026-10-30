
import { useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Clapperboard,
  House,
  Library,
  Search,
  Settings,
  SlidersHorizontal,
  Tv,
  X,
  type LucideIcon,
} from "lucide-react";
import "./App.css";

type Page = "Home" | "Tv" | "Library" | "Settings";

const navigation: { id: Page; label: string; icon: LucideIcon }[] = [
  { id: "Home", label: "Home", icon: House },
  { id: "Tv", label: "TV", icon: Tv },
  { id: "Library", label: "Library", icon: Library },
  { id: "Settings", label: "Settings", icon: Settings },
];

const moods = [
  {
    id: "elsewhere",
    title: "Somewhere else",
    description: "Worlds to get lost in",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "slowdown",
    title: "Slow it down",
    description: "Stories with room to breathe",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "unknown",
    title: "Into the unknown",
    description: "A little mystery goes far",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "wide-open",
    title: "Wide open",
    description: "Big skies, bigger stories",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
];

const pageTitles: Record<Page, string> = {
  Home: "Home",
  Tv: "TV",
  Library: "Library",
  Settings: "Settings",
};

function App() {
  const [activePage, setActivePage] = useState<Page>("Home");
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const visibleMoods = moods.filter((mood) =>
    `${mood.title} ${mood.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  const selectedMood = moods.find((mood) => mood.id === activeMood);

  function browseMood(moodId: string) {
    setActiveMood(moodId);
    setActivePage("Tv");
  }

  return (
    <div
      className="app-shell"
      data-reduced-motion={reduceMotion}
      data-high-contrast={highContrast}
    >
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={() => setActivePage("Home")}>
          <span className="brand-mark" aria-hidden="true">
            <Clapperboard size={20} strokeWidth={2.2} />
          </span>
          <span className="brand-name">Ladix</span>
        </a>

        <div className="nav-caption">Your space</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              className={`nav-link${activePage === id ? " is-active" : ""}`}
              key={id}
              type="button"
              aria-current={activePage === id ? "page" : undefined}
              onClick={() => setActivePage(id)}
            >
              <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
              {id === "Library" && activePage === id ? (
                <span className="nav-active-dot" aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-mark" aria-hidden="true" />
          <span>Make room for a good story.</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Your space</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{pageTitles[activePage]}</span>
          </div>
          <label className="search-box">
            <Search size={17} strokeWidth={1.9} aria-hidden="true" />
            <span className="visually-hidden">Search moods</span>
            <input
              type="search"
              placeholder="Find a mood"
              value={search}
              onFocus={() => setActivePage("Tv")}
              onChange={(event) => {
                setSearch(event.target.value);
                setActivePage("Tv");
              }}
            />
            {search ? (
              <button
                className="clear-search"
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={15} aria-hidden="true" />
              </button>
            ) : null}
          </label>
        </header>

        {activePage === "Home" ? (
          <div className="page-content">
            <section className="page-intro">
              <p className="eyebrow">A little space for screen time</p>
              <h1>What are we in the mood for?</h1>
              <p className="intro-copy">
                Find a direction, save what catches your eye, and make tonight easy.
              </p>
            </section>

            <section className="feature-panel" aria-labelledby="feature-title">
              <img
                className="feature-image"
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90"
                alt="Rows of seats in a cinema"
              />
              <div className="feature-shade" />
              <div className="feature-content">
                <span className="feature-kicker">
                  <span className="feature-kicker-dot" />
                  YOUR NEXT GOOD WATCH
                </span>
                <h2 id="feature-title">Start with a feeling.</h2>
                <p>Pick a mood and let the evening take it from there.</p>
                <button
                  className="button button-yellow"
                  type="button"
                  onClick={() => setActivePage("Tv")}
                >
                  Explore TV <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
              <span className="feature-index" aria-hidden="true">01 / 04</span>
            </section>

            <section className="mood-section" aria-labelledby="mood-heading">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Choose your direction</p>
                  <h2 id="mood-heading">Browse by mood</h2>
                </div>
                <button
                  className="text-action"
                  type="button"
                  onClick={() => setActivePage("Tv")}
                >
                  See all <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="mood-grid mood-grid-home">
                {moods.slice(0, 3).map((mood, index) => (
                  <button
                    className={`mood-card mood-card-${index + 1}`}
                    key={mood.id}
                    type="button"
                    onClick={() => browseMood(mood.id)}
                  >
                    <img src={mood.image} alt="" loading="lazy" />
                    <span className="mood-card-shade" />
                    <span className="mood-card-copy">
                      <span className="mood-card-description">{mood.description}</span>
                      <span className="mood-card-title">{mood.title}</span>
                    </span>
                    <span className="mood-card-arrow" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="library-callout">
              <div className="library-callout-icon" aria-hidden="true">
                <Bookmark size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h2>Your library, your way.</h2>
                <p>Keep the stories you want to come back to in one place.</p>
              </div>
              <button
                className="button button-outline"
                type="button"
                onClick={() => setActivePage("Library")}
              >
                Open library <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </section>
          </div>
        ) : null}

        {activePage === "Tv" ? (
          <div className="page-content">
            <section className="page-intro page-intro-compact">
              <p className="eyebrow">Explore at your own pace</p>
              <h1>TV, by feeling.</h1>
              <p className="intro-copy">
                Start with a mood, then find the kind of story you want tonight.
              </p>
            </section>

            <div className="browse-toolbar">
              <div className="browse-label">
                <SlidersHorizontal size={17} aria-hidden="true" />
                <span>{search ? `${visibleMoods.length} matches` : "Explore moods"}</span>
              </div>
              {activeMood ? (
                <button className="filter-chip" type="button" onClick={() => setActiveMood(null)}>
                  {selectedMood?.title} <X size={14} aria-hidden="true" />
                </button>
              ) : null}
            </div>

            {visibleMoods.length ? (
              <div className="mood-grid mood-grid-browse">
                {visibleMoods.map((mood, index) => (
                  <button
                    className={`mood-card mood-card-large mood-card-${index + 1}${activeMood === mood.id ? " is-selected" : ""}`}
                    key={mood.id}
                    type="button"
                    aria-pressed={activeMood === mood.id}
                    onClick={() => setActiveMood(activeMood === mood.id ? null : mood.id)}
                  >
                    <img src={mood.image} alt="" loading="lazy" />
                    <span className="mood-card-shade" />
                    <span className="mood-card-copy">
                      <span className="mood-card-description">{mood.description}</span>
                      <span className="mood-card-title">{mood.title}</span>
                    </span>
                    <span className="mood-card-arrow" aria-hidden="true">
                      {activeMood === mood.id ? <Check size={17} /> : <ArrowUpRight size={17} />}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state empty-state-search">
                <Search size={22} aria-hidden="true" />
                <h2>No moods found</h2>
                <p>Try a different search, or clear it to see every mood.</p>
                <button className="button button-outline" type="button" onClick={() => setSearch("")}>
                  Clear search <X size={15} aria-hidden="true" />
                </button>
              </div>
            )}

            {selectedMood ? (
              <div className="selection-note" role="status">
                <span className="selection-accent" />
                <span><strong>{selectedMood.title}</strong> is selected. Your next step is finding a story in this mood.</span>
              </div>
            ) : null}
          </div>
        ) : null}

        {activePage === "Library" ? (
          <div className="page-content page-content-narrow">
            <section className="page-intro page-intro-compact">
              <p className="eyebrow">Saved for later</p>
              <h1>Your library.</h1>
              <p className="intro-copy">A personal shelf for the stories you want to keep close.</p>
            </section>
            <section className="empty-state library-empty">
              <div className="empty-state-icon"><Bookmark size={24} strokeWidth={1.7} /></div>
              <span className="empty-state-label">A fresh start</span>
              <h2>Nothing saved just yet.</h2>
              <p>When something catches your eye, save it here and it will be waiting next time.</p>
              <button className="button button-dark" type="button" onClick={() => setActivePage("Tv")}>
                Find something to watch <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </section>
          </div>
        ) : null}

        {activePage === "Settings" ? (
          <div className="page-content page-content-narrow">
            <section className="page-intro page-intro-compact">
              <p className="eyebrow">Make it yours</p>
              <h1>Settings.</h1>
              <p className="intro-copy">A couple of small adjustments to make Ladix feel right.</p>
            </section>
            <section className="settings-panel" aria-label="Display preferences">
              <div className="settings-panel-heading">
                <h2>Display preferences</h2>
                <p>These choices only affect this device.</p>
              </div>
              <SettingToggle
                title="Reduce motion"
                description="Limit interface transitions and animation."
                checked={reduceMotion}
                onChange={() => setReduceMotion(!reduceMotion)}
              />
              <SettingToggle
                title="Higher contrast"
                description="Strengthen text and surface contrast."
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="setting-row">
      <div className="setting-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button
        className={`switch${checked ? " is-on" : ""}`}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={onChange}
      >
        <span className="switch-thumb" />
      </button>
    </div>
  );
}

export default App;
