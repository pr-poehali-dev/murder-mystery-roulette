import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Rarity = 'common' | 'rare' | 'legendary';

interface Weapon {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
}

interface CaseType {
  id: number;
  name: string;
  price: number;
  image: string;
  items: Weapon[];
}

const weapons: Weapon[] = [
  { id: 1, name: 'Classic Knife', image: '🔪', rarity: 'common' },
  { id: 2, name: 'Blue Steel', image: '🗡️', rarity: 'rare' },
  { id: 3, name: 'Golden Blade', image: '⚔️', rarity: 'legendary' },
  { id: 4, name: 'Silver Dagger', image: '🔪', rarity: 'common' },
  { id: 5, name: 'Ruby Edge', image: '🗡️', rarity: 'rare' },
  { id: 6, name: 'Diamond Sword', image: '⚔️', rarity: 'legendary' },
];

const cases: CaseType[] = [
  {
    id: 1,
    name: 'Starter Case',
    price: 100,
    image: '📦',
    items: weapons.slice(0, 3),
  },
  {
    id: 2,
    name: 'Premium Case',
    price: 250,
    image: '🎁',
    items: weapons.slice(2, 5),
  },
  {
    id: 3,
    name: 'Legendary Case',
    price: 500,
    image: '💎',
    items: weapons.slice(3, 6),
  },
];

const rarityColors = {
  common: 'bg-rarity-common',
  rare: 'bg-rarity-rare',
  legendary: 'bg-rarity-legendary',
};

const rarityLabels = {
  common: 'Common',
  rare: 'Rare',
  legendary: 'Legendary',
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOpening, setIsOpening] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);
  const [wonItem, setWonItem] = useState<Weapon | null>(null);
  const [inventory, setInventory] = useState<Weapon[]>([]);

  const openCase = (caseItem: CaseType) => {
    setSelectedCase(caseItem);
    setIsOpening(true);
    setWonItem(null);

    setTimeout(() => {
      const randomItem = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
      setWonItem(randomItem);
      setInventory([...inventory, randomItem]);
      setIsOpening(false);
    }, 3000);
  };

  const closeRoulette = () => {
    setSelectedCase(null);
    setWonItem(null);
    setIsOpening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-dark via-gray-900 to-roblox-dark">
      <nav className="bg-roblox-dark/80 backdrop-blur-sm border-b border-roblox-red/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎮</span>
              <h1 className="text-2xl font-bold text-white">MM2 CASES</h1>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'cases', label: 'Кейсы', icon: 'Package' },
                { id: 'inventory', label: 'Инвентарь', icon: 'Archive' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
                { id: 'rules', label: 'Правила', icon: 'FileText' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-roblox-red text-white hover:bg-roblox-red/90'
                      : 'text-gray-300 hover:text-white hover:bg-roblox-red/20'
                  }`}
                >
                  <Icon name={tab.icon as any} size={18} className="mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="text-center py-12 space-y-4">
              <h2 className="text-5xl font-bold text-white animate-float">
                Открой свой <span className="text-roblox-red">кейс</span>!
              </h2>
              <p className="text-xl text-gray-300">
                Получи легендарные скины из Murder Mystery 2
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="bg-gray-800/50 border-2 border-gray-700 hover:border-roblox-red transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    <div className="text-6xl text-center animate-float">{caseItem.image}</div>
                    <h3 className="text-2xl font-bold text-white text-center">
                      {caseItem.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Coins" size={20} className="text-roblox-yellow" />
                      <span className="text-xl font-bold text-roblox-yellow">
                        {caseItem.price}
                      </span>
                    </div>
                    <Button
                      onClick={() => openCase(caseItem)}
                      className="w-full bg-roblox-red hover:bg-roblox-red/90 text-white font-bold text-lg py-6 group-hover:scale-105 transition-transform"
                    >
                      Открыть кейс
                    </Button>
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      {caseItem.items.map((item) => (
                        <Badge
                          key={item.id}
                          className={`${rarityColors[item.rarity]} text-white`}
                        >
                          {item.image}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Все кейсы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="bg-gray-800/50 border-2 border-gray-700 hover:border-roblox-blue transition-all"
                >
                  <div className="p-6 space-y-4">
                    <div className="text-5xl text-center">{caseItem.image}</div>
                    <h3 className="text-xl font-bold text-white text-center">
                      {caseItem.name}
                    </h3>
                    <p className="text-roblox-yellow text-center font-bold">
                      {caseItem.price} монет
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Мой инвентарь</h2>
              <Badge variant="outline" className="text-white border-roblox-blue">
                {inventory.length} предметов
              </Badge>
            </div>
            {inventory.length === 0 ? (
              <Card className="bg-gray-800/50 border-gray-700 p-12">
                <p className="text-center text-gray-400 text-lg">
                  Твой инвентарь пуст. Открой кейс, чтобы получить предметы!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {inventory.map((item, index) => (
                  <Card
                    key={index}
                    className={`${
                      rarityColors[item.rarity]
                    } bg-opacity-20 border-2 p-4 text-center space-y-2`}
                  >
                    <div className="text-4xl">{item.image}</div>
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <Badge className={`${rarityColors[item.rarity]} text-white text-xs`}>
                      {rarityLabels[item.rarity]}
                    </Badge>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Профиль</h2>
            <Card className="bg-gray-800/50 border-gray-700 p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-roblox-red flex items-center justify-center text-4xl">
                  👤
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Игрок #1337</h3>
                  <div className="flex gap-4 text-gray-300">
                    <span>Баланс: 1000 💰</span>
                    <span>Открыто кейсов: {inventory.length}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Правила</h2>
            <Card className="bg-gray-800/50 border-gray-700 p-8 space-y-6">
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-xl font-bold text-roblox-red mb-2">
                    Система редкости
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <Badge className="bg-rarity-common text-white">Common</Badge>
                      <span>Шанс выпадения: 60%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-rarity-rare text-white">Rare</Badge>
                      <span>Шанс выпадения: 30%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge className="bg-rarity-legendary text-white">Legendary</Badge>
                      <span>Шанс выпадения: 10%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-roblox-blue mb-2">
                    Как играть
                  </h3>
                  <ol className="list-decimal ml-6 space-y-2">
                    <li>Выбери кейс на главной странице</li>
                    <li>Нажми "Открыть кейс"</li>
                    <li>Наблюдай за анимацией рулетки</li>
                    <li>Получи свой приз в инвентарь!</li>
                  </ol>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {selectedCase && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold text-white">{selectedCase.name}</h3>
              <p className="text-gray-300">Открываем кейс...</p>
            </div>

            <div className="relative h-64 bg-gray-900 rounded-xl border-4 border-roblox-red overflow-hidden">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-roblox-red z-10"></div>
              <div
                className={`flex gap-4 items-center h-full px-8 ${
                  isOpening ? 'animate-spin-roulette' : ''
                }`}
              >
                {[...selectedCase.items, ...selectedCase.items].map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-40 h-40 ${
                      rarityColors[item.rarity]
                    } rounded-lg flex flex-col items-center justify-center gap-2 border-2`}
                  >
                    <span className="text-5xl">{item.image}</span>
                    <span className="text-white font-bold text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {wonItem && !isOpening && (
              <div className="text-center space-y-4 animate-scale-in">
                <h4 className="text-2xl font-bold text-roblox-yellow">
                  🎉 Ты выиграл! 🎉
                </h4>
                <div
                  className={`inline-block ${
                    rarityColors[wonItem.rarity]
                  } rounded-xl p-8 border-4 animate-glow-pulse`}
                >
                  <div className="text-7xl mb-4">{wonItem.image}</div>
                  <h5 className="text-2xl font-bold text-white">{wonItem.name}</h5>
                  <Badge className={`${rarityColors[wonItem.rarity]} text-white mt-2`}>
                    {rarityLabels[wonItem.rarity]}
                  </Badge>
                </div>
              </div>
            )}

            {!isOpening && (
              <div className="flex justify-center">
                <Button
                  onClick={closeRoulette}
                  className="bg-roblox-blue hover:bg-roblox-blue/90 text-white font-bold px-8"
                >
                  Закрыть
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
