/**
 * FaithSteps - Journey & Milestone Constants
 * 
 * Design Philosophy:
 * - Break long journeys into "Parts" to reduce fatigue
 * - Each part should be completable in 2-4 weeks at 7000 steps/day
 * - Target: 50-150km per part (sweet spot for engagement)
 * - Users feel accomplishment frequently, not burned out
 */


export interface Scripture {
  reference: string;
  text: string;
  version: 'NIV' | 'ESV' | 'KJV';
  tags: string[];
}

export interface Milestone {
  id: string;
  name: string;
  shortName: string; // For UI display (e.g., "Succoth" instead of "Succoth - First Stop")
  description: string;
  distanceFromStart: number; // meters
  percentOfJourney: number;
  location: {
    lat: number;
    lng: number;
  };
  scriptures: Scripture[];
  historicalContext: string;
  imageUrl: string;
  reflectionPrompt: string; // Question for journal entry
  order: number;
}

export interface Journey {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'old_testament' | 'new_testament' | 'pilgrimage';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'epic';
  
  // Geography
  totalDistance: number; // meters
  estimatedDays: number; // At 7000 steps/day
  startLocation: { lat: number; lng: number };
  endLocation: { lat: number; lng: number };
  
  // Content
  milestones: Milestone[];
  featuredImageUrl: string;
  thumbnailUrl: string;
  
  // Metadata
  unlockRequirements?: string[]; // Journey IDs required
  partOf?: string; // If part of a series (e.g., "exodus-series")
  partNumber?: number; // 1, 2, 3, etc.
  totalParts?: number;
  nextPart?: string; // Journey ID of next part
  
  seasonal?: {
    season: 'advent' | 'lent' | 'easter';
    startDate: string;
    endDate: string;
  };
  
  // Display
  order: number;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
}

// ============================================================================
// BEGINNER JOURNEYS (10-50km)
// Perfect for first-time users, completable in 1-2 weeks
// ============================================================================

export const ROAD_TO_EMMAUS: Journey = {
  id: 'road-to-emmaus',
  name: 'Road to Emmaus',
  subtitle: 'A resurrection encounter',
  description: 'Walk the same road where two disciples met the risen Christ. Experience the journey from despair to recognition, from confusion to faith.',
  category: 'new_testament',
  difficulty: 'beginner',
  totalDistance: 11000, // 11km
  estimatedDays: 3,
  startLocation: { lat: 31.7683, lng: 35.2137 }, // Jerusalem
  endLocation: { lat: 31.8463, lng: 34.9897 }, // Emmaus
  featuredImageUrl: '/assets/journeys/emmaus/hero.jpg',
  thumbnailUrl: '/assets/journeys/emmaus/thumb.jpg',
  isFeatured: false,
  isNew: false,
  order: 1,
  tags: ['resurrection', 'easter', 'beginner-friendly', 'hope'],
  
  milestones: [
    {
      id: 'emmaus-start',
      name: 'Jerusalem - Departure',
      shortName: 'Jerusalem',
      description: 'The disciples leave Jerusalem, hearts heavy with grief and confusion after the crucifixion.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 31.7683, lng: 35.2137 },
      order: 0,
      scriptures: [
        {
          reference: 'Luke 24:13',
          text: 'Now that same day two of them were going to a village called Emmaus, about seven miles from Jerusalem.',
          version: 'NIV',
          tags: ['journey', 'grief'],
        },
      ],
      historicalContext: 'Jerusalem in the first century was the center of Jewish religious life. The disciples walked away from this holy city in despair, not yet understanding the resurrection.',
      imageUrl: '/assets/milestones/jerusalem-gate.jpg',
      reflectionPrompt: 'Have you ever walked away from hope? What brought you back?',
    },
    {
      id: 'emmaus-encounter',
      name: 'The Stranger Joins',
      shortName: 'Encounter',
      description: 'A stranger approaches and walks with them. They don\'t recognize Him yet.',
      distanceFromStart: 5500, // Halfway
      percentOfJourney: 50,
      location: { lat: 31.8073, lng: 35.1017 },
      order: 1,
      scriptures: [
        {
          reference: 'Luke 24:15-16',
          text: 'As they talked and discussed these things with each other, Jesus himself came up and walked along with them; but they were kept from recognizing him.',
          version: 'NIV',
          tags: ['presence', 'faith'],
        },
      ],
      historicalContext: 'Jewish travelers often walked together for safety. It was common for strangers to join groups on the road.',
      imageUrl: '/assets/milestones/dusty-road.jpg',
      reflectionPrompt: 'When has God been present in your life without you realizing it?',
    },
    {
      id: 'emmaus-arrival',
      name: 'Emmaus - Recognition',
      shortName: 'Emmaus',
      description: 'At dinner, when Jesus breaks the bread, their eyes are opened and they recognize Him.',
      distanceFromStart: 11000,
      percentOfJourney: 100,
      location: { lat: 31.8463, lng: 34.9897 },
      order: 2,
      scriptures: [
        {
          reference: 'Luke 24:30-31',
          text: 'When he was at the table with them, he took bread, gave thanks, broke it and began to give it to them. Then their eyes were opened and they recognized him.',
          version: 'NIV',
          tags: ['revelation', 'communion', 'recognition'],
        },
      ],
      historicalContext: 'The breaking of bread was a sacred Jewish tradition. In this moment, the disciples recognized Jesus through His familiar gesture.',
      imageUrl: '/assets/milestones/broken-bread.jpg',
      reflectionPrompt: 'What moments have opened your eyes to God\'s presence?',
    },
  ],
};

export const JERICHO_TO_JERUSALEM: Journey = {
  id: 'jericho-to-jerusalem',
  name: 'Jericho to Jerusalem',
  subtitle: 'The Good Samaritan\'s road',
  description: 'Walk the dangerous road from the parable of the Good Samaritan. A journey about compassion, prejudice, and what it means to be a neighbor.',
  category: 'new_testament',
  difficulty: 'beginner',
  totalDistance: 27000, // 27km
  estimatedDays: 6,
  startLocation: { lat: 31.8557, lng: 35.4639 }, // Jericho
  endLocation: { lat: 31.7683, lng: 35.2137 }, // Jerusalem
  featuredImageUrl: '/assets/journeys/jericho/hero.jpg',
  thumbnailUrl: '/assets/journeys/jericho/thumb.jpg',
  isFeatured: false,
  isNew: true,
  order: 2,
  tags: ['parables', 'compassion', 'mercy', 'service'],
  
  milestones: [
    {
      id: 'jericho-start',
      name: 'Jericho - City of Palms',
      shortName: 'Jericho',
      description: 'Begin in Jericho, one of the oldest cities in the world, where Jesus healed the blind and found Zacchaeus.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 31.8557, lng: 35.4639 },
      order: 0,
      scriptures: [
        {
          reference: 'Luke 10:30',
          text: 'A man was going down from Jerusalem to Jericho, when he was attacked by robbers.',
          version: 'NIV',
          tags: ['parables', 'danger'],
        },
      ],
      historicalContext: 'Jericho sits 250 meters below sea level, making the journey to Jerusalem a steep 1200-meter climb. This road was notorious for bandits.',
      imageUrl: '/assets/milestones/jericho-palms.jpg',
      reflectionPrompt: 'What dangerous paths has God called you to walk?',
    },
    {
      id: 'jericho-midway',
      name: 'The Dangerous Road',
      shortName: 'Midway',
      description: 'The treacherous middle section where robbers often struck. The place of the parable.',
      distanceFromStart: 13500,
      percentOfJourney: 50,
      location: { lat: 31.8120, lng: 35.3388 },
      order: 1,
      scriptures: [
        {
          reference: 'Luke 10:33-34',
          text: 'But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him. He went to him and bandaged his wounds.',
          version: 'NIV',
          tags: ['compassion', 'mercy', 'service'],
        },
      ],
      historicalContext: 'This desolate stretch between Jericho and Jerusalem was called "The Way of Blood" due to frequent robberies and violence.',
      imageUrl: '/assets/milestones/rocky-path.jpg',
      reflectionPrompt: 'Who is your neighbor? Who have you passed by?',
    },
    {
      id: 'jericho-jerusalem',
      name: 'Jerusalem - The Holy City',
      shortName: 'Jerusalem',
      description: 'Arrive in Jerusalem, elevated both physically and spiritually. The destination of countless pilgrims.',
      distanceFromStart: 27000,
      percentOfJourney: 100,
      location: { lat: 31.7683, lng: 35.2137 },
      order: 2,
      scriptures: [
        {
          reference: 'Luke 10:37',
          text: 'Jesus told him, "Go and do likewise."',
          version: 'NIV',
          tags: ['action', 'obedience', 'love'],
        },
      ],
      historicalContext: 'Jerusalem, the City of David, was the center of Jewish worship and the destination of three annual pilgrimages commanded in Scripture.',
      imageUrl: '/assets/milestones/jerusalem-walls.jpg',
      reflectionPrompt: 'How will you "go and do likewise" this week?',
    },
  ],
};

// ============================================================================
// INTERMEDIATE JOURNEYS (50-150km) 
// For users ready for a longer commitment, 2-4 week completion
// ============================================================================

export const EXODUS_PART_1: Journey = {
  id: 'exodus-part-1',
  name: 'The Exodus - Part 1: Liberation',
  subtitle: 'From slavery to the Red Sea',
  description: 'Experience the first leg of Israel\'s greatest journey. From the plagues of Egypt through the miraculous crossing of the Red Sea.',
  category: 'old_testament',
  difficulty: 'intermediate',
  totalDistance: 135000, // 135km
  estimatedDays: 28,
  startLocation: { lat: 30.0444, lng: 31.2357 }, // Rameses (near Cairo)
  endLocation: { lat: 29.9272, lng: 32.5498 }, // Bitter Lakes (Red Sea crossing site)
  featuredImageUrl: '/assets/journeys/exodus-1/hero.jpg',
  thumbnailUrl: '/assets/journeys/exodus-1/thumb.jpg',
  isFeatured: true,
  isNew: false,
  order: 10,
  partOf: 'exodus-series',
  partNumber: 1,
  totalParts: 3,
  nextPart: 'exodus-part-2',
  tags: ['deliverance', 'freedom', 'miracles', 'faith', 'iconic'],
  
  milestones: [
    {
      id: 'exodus-rameses',
      name: 'Rameses - The Departure',
      shortName: 'Rameses (Start)',
      description: 'The night of the Passover. After 430 years of slavery, Israel walks out of Egypt as free people.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 30.0444, lng: 31.2357 },
      order: 0,
      scriptures: [
        {
          reference: 'Exodus 12:37-38',
          text: 'The Israelites journeyed from Rameses to Sukkoth. There were about six hundred thousand men on foot, besides women and children.',
          version: 'NIV',
          tags: ['passover', 'deliverance', 'freedom'],
        },
      ],
      historicalContext: 'Rameses was one of Egypt\'s greatest cities, built by the forced labor of Israelite slaves. Tonight, they walked out carrying Egypt\'s wealth.',
      imageUrl: '/assets/milestones/rameses-night.jpg',
      reflectionPrompt: 'What slavery has God freed you from?',
    },
    {
      id: 'exodus-succoth',
      name: 'Succoth - First Camp',
      shortName: 'Succoth',
      description: 'The first camp of freedom. Israel rests after their hasty departure from Egypt.',
      distanceFromStart: 45000, // 45km
      percentOfJourney: 33,
      location: { lat: 30.5833, lng: 32.2667 },
      order: 1,
      scriptures: [
        {
          reference: 'Exodus 13:20',
          text: 'After leaving Sukkoth they camped at Etham on the edge of the desert.',
          version: 'NIV',
          tags: ['journey', 'wilderness'],
        },
      ],
      historicalContext: 'Succoth means "booths" or "shelters" - a temporary dwelling for a people who would wander for 40 years.',
      imageUrl: '/assets/milestones/desert-camp.jpg',
      reflectionPrompt: 'How do you rest in God during times of transition?',
    },
    {
      id: 'exodus-etham',
      name: 'Etham - Edge of the Wilderness',
      shortName: 'Etham',
      description: 'At the border of the wilderness, God leads with a pillar of cloud by day and fire by night.',
      distanceFromStart: 90000, // 90km
      percentOfJourney: 67,
      location: { lat: 30.3167, lng: 32.3500 },
      order: 2,
      scriptures: [
        {
          reference: 'Exodus 13:21-22',
          text: 'By day the Lord went ahead of them in a pillar of cloud to guide them on their way and by night in a pillar of fire to give them light.',
          version: 'NIV',
          tags: ['guidance', 'presence', 'faithfulness'],
        },
      ],
      historicalContext: 'The pillar of cloud and fire was God\'s visible presence with Israel - never leaving them, always guiding them.',
      imageUrl: '/assets/milestones/pillar-fire.jpg',
      reflectionPrompt: 'How has God guided you in unclear times?',
    },
    {
      id: 'exodus-red-sea',
      name: 'The Red Sea - Walls of Water',
      shortName: 'Red Sea',
      description: 'Trapped between Pharaoh\'s army and the sea, God parts the waters. Israel walks through on dry ground.',
      distanceFromStart: 135000, // 135km
      percentOfJourney: 100,
      location: { lat: 29.9272, lng: 32.5498 },
      order: 3,
      scriptures: [
        {
          reference: 'Exodus 14:21-22',
          text: 'Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land. The waters were divided, and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.',
          version: 'NIV',
          tags: ['miracle', 'deliverance', 'faith', 'impossible'],
        },
      ],
      historicalContext: 'The Red Sea crossing is one of history\'s most dramatic miracles. What seemed like certain death became the path to freedom.',
      imageUrl: '/assets/milestones/red-sea-parted.jpg',
      reflectionPrompt: 'What impossible situation are you facing? How is God making a way?',
    },
  ],
};

export const EXODUS_PART_2: Journey = {
  id: 'exodus-part-2',
  name: 'The Exodus - Part 2: Covenant',
  subtitle: 'Wilderness to Mount Sinai',
  description: 'Journey deeper into the wilderness to the mountain where God gave the Law. Experience provision, grumbling, and the weight of divine glory.',
  category: 'old_testament',
  difficulty: 'intermediate',
  totalDistance: 125000, // 125km
  estimatedDays: 26,
  startLocation: { lat: 29.9272, lng: 32.5498 }, // Red Sea
  endLocation: { lat: 28.5392, lng: 33.9750 }, // Mount Sinai
  featuredImageUrl: '/assets/journeys/exodus-2/hero.jpg',
  thumbnailUrl: '/assets/journeys/exodus-2/thumb.jpg',
  unlockRequirements: ['exodus-part-1'],
  isFeatured: false,
  isNew: false,
  order: 11,
  partOf: 'exodus-series',
  partNumber: 2,
  totalParts: 3,
  nextPart: 'exodus-part-3',
  tags: ['law', 'covenant', 'provision', 'grumbling'],
  
  milestones: [
    {
      id: 'exodus2-marah',
      name: 'Marah - Bitter Waters Made Sweet',
      shortName: 'Marah',
      description: 'Three days without water, then bitter water. God makes it sweet.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 29.8667, lng: 32.8333 },
      order: 0,
      scriptures: [
        {
          reference: 'Exodus 15:23-25',
          text: 'When they came to Marah, they could not drink its water because it was bitter... Then Moses cried out to the Lord, and the Lord showed him a piece of wood. He threw it into the water, and the water became fit to drink.',
          version: 'NIV',
          tags: ['provision', 'complaint', 'healing'],
        },
      ],
      historicalContext: 'Marah means "bitter." The Israelites learned early that God provides even when circumstances look hopeless.',
      imageUrl: '/assets/milestones/desert-spring.jpg',
      reflectionPrompt: 'What bitterness has God transformed in your life?',
    },
    {
      id: 'exodus2-elim',
      name: 'Elim - Twelve Springs',
      shortName: 'Elim',
      description: 'An oasis with twelve springs and seventy palm trees. God\'s abundant provision after the bitter waters.',
      distanceFromStart: 15000,
      percentOfJourney: 12,
      location: { lat: 29.3333, lng: 32.9167 },
      order: 1,
      scriptures: [
        {
          reference: 'Exodus 15:27',
          text: 'Then they came to Elim, where there were twelve springs and seventy palm trees, and they camped there near the water.',
          version: 'NIV',
          tags: ['rest', 'provision', 'abundance'],
        },
      ],
      historicalContext: 'After bitter water at Marah, God led them to this place of abundance - a reminder that He provides rest along the journey.',
      imageUrl: '/assets/milestones/oasis-palms.jpg',
      reflectionPrompt: 'Where has God given you rest and refreshment recently?',
    },
    {
      id: 'exodus2-sin-desert',
      name: 'Wilderness of Sin - Manna Falls',
      shortName: 'Wilderness of Sin',
      description: 'Hungry and complaining, Israel receives bread from heaven. God provides manna every morning for 40 years.',
      distanceFromStart: 45000,
      percentOfJourney: 36,
      location: { lat: 29.0000, lng: 33.2500 },
      order: 2,
      scriptures: [
        {
          reference: 'Exodus 16:4',
          text: 'Then the Lord said to Moses, "I will rain down bread from heaven for you. The people are to go out each day and gather enough for that day."',
          version: 'NIV',
          tags: ['provision', 'daily bread', 'trust', 'manna'],
        },
      ],
      historicalContext: 'Manna appeared every morning except the Sabbath. Israel learned to trust God one day at a time - just like Jesus taught us to pray for daily bread.',
      imageUrl: '/assets/milestones/manna-morning.jpg',
      reflectionPrompt: 'What daily provision do you need to trust God for?',
    },
    {
      id: 'exodus2-rephidim',
      name: 'Rephidim - Water from the Rock',
      shortName: 'Rephidim',
      description: 'No water again. Moses strikes the rock and water gushes out. The place is named "Testing" because they tested God.',
      distanceFromStart: 85000,
      percentOfJourney: 68,
      location: { lat: 28.7500, lng: 33.5833 },
      order: 3,
      scriptures: [
        {
          reference: 'Exodus 17:6',
          text: 'I will stand there before you by the rock at Horeb. Strike the rock, and water will come out of it for the people to drink.',
          version: 'NIV',
          tags: ['provision', 'testing', 'miracle'],
        },
      ],
      historicalContext: 'This same rock became a symbol Paul used: "they drank from the spiritual rock that accompanied them, and that rock was Christ" (1 Cor 10:4).',
      imageUrl: '/assets/milestones/rock-water.jpg',
      reflectionPrompt: 'How have you tested God? How has He remained faithful?',
    },
    {
      id: 'exodus2-sinai',
      name: 'Mount Sinai - The Law',
      shortName: 'Mount Sinai',
      description: 'The mountain shakes with God\'s presence. Moses receives the Ten Commandments. A covenant is made.',
      distanceFromStart: 125000,
      percentOfJourney: 100,
      location: { lat: 28.5392, lng: 33.9750 },
      order: 4,
      scriptures: [
        {
          reference: 'Exodus 19:18-20',
          text: 'Mount Sinai was covered with smoke, because the Lord descended on it in fire. The smoke billowed up from it like smoke from a furnace, and the whole mountain trembled violently.',
          version: 'NIV',
          tags: ['law', 'covenant', 'holiness', 'glory'],
        },
      ],
      historicalContext: 'God met Moses on this mountain twice: once at the burning bush, now to give the Law. This is where Israel became God\'s treasured possession.',
      imageUrl: '/assets/milestones/sinai-lightning.jpg',
      reflectionPrompt: 'What does it mean to you that God wants a covenant relationship?',
    },
  ],
};

// Continue with Part 3...
export const EXODUS_PART_3: Journey = {
  id: 'exodus-part-3',
  name: 'The Exodus - Part 3: Wandering to the Promised Land',
  subtitle: 'From Sinai to the Jordan River',
  description: 'The final stretch. Forty years of wandering condensed, ending at the edge of the Promised Land. A generation passes, a new one rises.',
  category: 'old_testament',
  difficulty: 'advanced',
  totalDistance: 140000, // 140km
  estimatedDays: 29,
  startLocation: { lat: 28.5392, lng: 33.9750 }, // Sinai
  endLocation: { lat: 31.9522, lng: 35.5560 }, // Jordan River
  featuredImageUrl: '/assets/journeys/exodus-3/hero.jpg',
  thumbnailUrl: '/assets/journeys/exodus-3/thumb.jpg',
  unlockRequirements: ['exodus-part-2'],
  isFeatured: false,
  isNew: false,
  order: 12,
  partOf: 'exodus-series',
  partNumber: 3,
  totalParts: 3,
  tags: ['wilderness', 'promise', 'new-generation', 'hope'],
  
  milestones: [
    {
      id: 'exodus3-kadesh',
      name: 'Kadesh Barnea - The Spies',
      shortName: 'Kadesh',
      description: 'Twelve spies scout the Promised Land. Ten bring back fear, two bring back faith. Israel chooses fear.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 30.6833, lng: 34.4500 },
      order: 0,
      scriptures: [
        {
          reference: 'Numbers 13:30-31',
          text: 'Then Caleb silenced the people before Moses and said, "We should go up and take possession of the land, for we can certainly do it." But the men who had gone up with him said, "We can\'t attack those people; they are stronger than we are."',
          version: 'NIV',
          tags: ['faith', 'fear', 'unbelief'],
        },
      ],
      historicalContext: 'This was the closest Israel came to Canaan during the Exodus. Their fear cost them 40 years in the wilderness - one year for each day the spies explored.',
      imageUrl: '/assets/milestones/kadesh-oasis.jpg',
      reflectionPrompt: 'What promises of God seem too big to believe? What holds you back?',
    },
    {
      id: 'exodus3-wilderness',
      name: 'Wilderness Years - A Generation Passes',
      shortName: 'Wilderness',
      description: 'Forty years compressed into one milestone. An entire generation learns to trust God in the desert.',
      distanceFromStart: 70000,
      percentOfJourney: 50,
      location: { lat: 29.5000, lng: 35.0000 },
      order: 1,
      scriptures: [
        {
          reference: 'Deuteronomy 8:2-3',
          text: 'Remember how the Lord your God led you all the way in the wilderness these forty years, to humble and test you... He humbled you, causing you to hunger and then feeding you with manna... to teach you that man does not live on bread alone.',
          version: 'NIV',
          tags: ['testing', 'provision', 'humility', 'learning'],
        },
      ],
      historicalContext: 'The wilderness wasn\'t punishment - it was preparation. God shaped a slave people into a nation ready to trust Him.',
      imageUrl: '/assets/milestones/endless-desert.jpg',
      reflectionPrompt: 'What has God taught you in your own wilderness seasons?',
    },
    {
      id: 'exodus3-jordan',
      name: 'Jordan River - Standing on Promise',
      shortName: 'Jordan River',
      description: 'Moses sees the Promised Land but doesn\'t enter. Joshua leads a new generation across the Jordan.',
      distanceFromStart: 140000,
      percentOfJourney: 100,
      location: { lat: 31.9522, lng: 35.5560 },
      order: 2,
      scriptures: [
        {
          reference: 'Joshua 3:15-17',
          text: 'Yet as soon as the priests who carried the ark reached the Jordan and their feet touched the water\'s edge... the water from upstream stopped flowing... So the people crossed over opposite Jericho.',
          version: 'NIV',
          tags: ['promise', 'crossing', 'new-beginning', 'faith'],
        },
      ],
      historicalContext: 'The Jordan River parts just like the Red Sea - bookending the Exodus. Same God, same power, new generation.',
      imageUrl: '/assets/milestones/jordan-crossing.jpg',
      reflectionPrompt: 'What new things is God calling you to step into by faith?',
    },
  ],
};

// ============================================================================
// ADVANCED JOURNEYS (150-300km)
// For committed users, 4-8 week journeys
// ============================================================================

export const JESUS_GALILEE: Journey = {
  id: 'jesus-galilee',
  name: 'Jesus in Galilee',
  subtitle: 'The ministry around the sea',
  description: 'Follow Jesus through His ministry in Galilee. From calling fishermen to calming storms, from healing lepers to feeding thousands.',
  category: 'new_testament',
  difficulty: 'advanced',
  totalDistance: 150000, // 150km
  estimatedDays: 31,
  startLocation: { lat: 32.7041, lng: 35.2981 }, // Nazareth
  endLocation: { lat: 32.8818, lng: 35.5767 }, // Capernaum
  featuredImageUrl: '/assets/journeys/galilee/hero.jpg',
  thumbnailUrl: '/assets/journeys/galilee/thumb.jpg',
  isFeatured: true,
  isNew: false,
  order: 20,
  tags: ['jesus', 'miracles', 'teaching', 'compassion'],
  
  milestones: [
    {
      id: 'galilee-nazareth',
      name: 'Nazareth - Rejected in His Hometown',
      shortName: 'Nazareth',
      description: 'Jesus returns to His childhood home and reads from Isaiah in the synagogue. They try to throw Him off a cliff.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 32.7041, lng: 35.2981 },
      order: 0,
      scriptures: [
        {
          reference: 'Luke 4:24',
          text: '"Truly I tell you," he continued, "no prophet is accepted in his hometown."',
          version: 'NIV',
          tags: ['rejection', 'hometown', 'identity'],
        },
      ],
      historicalContext: 'Nazareth was a small, insignificant town. "Can anything good come from Nazareth?" people asked. Yet this is where God chose to raise His Son.',
      imageUrl: '/assets/milestones/nazareth-hills.jpg',
      reflectionPrompt: 'Have you ever been rejected for following God? How did you respond?',
    },
    {
      id: 'galilee-cana',
      name: 'Cana - Water into Wine',
      shortName: 'Cana',
      description: 'Jesus\' first miracle at a wedding feast. Six stone jars of water become the finest wine.',
      distanceFromStart: 12000,
      percentOfJourney: 8,
      location: { lat: 32.7467, lng: 35.3400 },
      order: 1,
      scriptures: [
        {
          reference: 'John 2:11',
          text: 'What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory; and his disciples believed in him.',
          version: 'NIV',
          tags: ['miracles', 'glory', 'beginning'],
        },
      ],
      historicalContext: 'Wine was essential at Jewish weddings. Running out would have brought shame on the family. Jesus prevented embarrassment and revealed His glory.',
      imageUrl: '/assets/milestones/stone-jars.jpg',
      reflectionPrompt: 'What ordinary things in your life is Jesus transforming?',
    },
    {
      id: 'galilee-capernaum',
      name: 'Capernaum - Jesus\' Home Base',
      shortName: 'Capernaum',
      description: 'Jesus makes this fishing village His headquarters. Here He calls Peter, heals the paralytic, and teaches with authority.',
      distanceFromStart: 38000,
      percentOfJourney: 25,
      location: { lat: 32.8818, lng: 35.5767 },
      order: 2,
      scriptures: [
        {
          reference: 'Matthew 4:13',
          text: 'Leaving Nazareth, he went and lived in Capernaum, which was by the lake in the area of Zebulun and Naphtali.',
          version: 'NIV',
          tags: ['calling', 'disciples', 'authority'],
        },
      ],
      historicalContext: 'Capernaum was a bustling fishing town on the trade route. Jesus chose working-class fishermen as His closest followers.',
      imageUrl: '/assets/milestones/capernaum-synagogue.jpg',
      reflectionPrompt: 'Who has Jesus called you to follow Him alongside?',
    },
    {
      id: 'galilee-beatitudes',
      name: 'Mount of Beatitudes - The Sermon',
      shortName: 'Mount of Beatitudes',
      description: 'Jesus sits on a mountainside and teaches the crowds. "Blessed are the poor in spirit..."',
      distanceFromStart: 75000,
      percentOfJourney: 50,
      location: { lat: 32.8833, lng: 35.5597 },
      order: 3,
      scriptures: [
        {
          reference: 'Matthew 5:3-10',
          text: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted...', 
          version: 'NIV',
          tags: ['teaching', 'kingdom', 'blessing'],
        },
      ],
      historicalContext: 'The Sermon on the Mount is Jesus\' most famous teaching. It turns the world\'s values upside down.',
      imageUrl: '/assets/milestones/beatitudes-hill.jpg',
      reflectionPrompt: 'Which Beatitude speaks most to your life right now?',
    },
    {
      id: 'galilee-feeding',
      name: 'Bethsaida - Feeding the 5000',
      shortName: 'Bethsaida',
      description: 'Five loaves and two fish become enough for thousands. Everyone eats, and twelve baskets are left over.',
      distanceFromStart: 112000,
      percentOfJourney: 75,
      location: { lat: 32.9119, lng: 35.6375 },
      order: 4,
      scriptures: [
        {
          reference: 'Mark 6:41-42',
          text: 'Taking the five loaves and the two fish and looking up to heaven, he gave thanks and broke the loaves. Then he gave them to his disciples to distribute to the people. He also divided the two fish among them all. They all ate and were satisfied.',
          version: 'NIV',
          tags: ['provision', 'compassion', 'multiplication'],
        },
      ],
      historicalContext: 'This is the only miracle recorded in all four Gospels. It shows Jesus\' compassion for physical needs, not just spiritual ones.',
      imageUrl: '/assets/milestones/bread-fish.jpg',
      reflectionPrompt: 'What little do you have that Jesus can multiply?',
    },
    {
      id: 'galilee-sea-storm',
      name: 'Sea of Galilee - Calming the Storm',
      shortName: 'Sea of Galilee',
      description: 'A furious storm terrifies the disciples. Jesus is asleep. "Who is this? Even the wind and waves obey him!"',
      distanceFromStart: 150000,
      percentOfJourney: 100,
      location: { lat: 32.8406, lng: 35.5994 },
      order: 5,
      scriptures: [
        {
          reference: 'Mark 4:39-41',
          text: 'He got up, rebuked the wind and said to the waves, "Quiet! Be still!" Then the wind died down and it was completely calm. He said to his disciples, "Why are you so afraid? Do you still have no faith?"',
          version: 'NIV',
          tags: ['storm', 'faith', 'peace', 'power'],
        },
      ],
      historicalContext: 'The Sea of Galilee is 700 feet below sea level, surrounded by hills. Storms can appear suddenly and be violent.',
      imageUrl: '/assets/milestones/stormy-sea.jpg',
      reflectionPrompt: 'What storm in your life needs Jesus to speak peace into?',
    },
  ],
};

// ============================================================================
// PAUL'S JOURNEYS (Split into manageable parts)
// ============================================================================

export const PAUL_JOURNEY_1A: Journey = {
  id: 'paul-journey-1a',
  name: 'Paul\'s First Journey - Part 1: Cyprus',
  subtitle: 'From Antioch through the island',
  description: 'Join Paul and Barnabas on the first missionary journey. Sail to Cyprus, confront false prophets, and plant the first Gentile churches.',
  category: 'new_testament',
  difficulty: 'intermediate',
  totalDistance: 145000, // 145km
  estimatedDays: 30,
  startLocation: { lat: 36.1408, lng: 36.1638 }, // Syrian Antioch
  endLocation: { lat: 34.9208, lng: 33.6290 }, // Paphos, Cyprus
  featuredImageUrl: '/assets/journeys/paul-1a/hero.jpg',
  thumbnailUrl: '/assets/journeys/paul-1a/thumb.jpg',
  isFeatured: false,
  isNew: true,
  order: 30,
  partOf: 'paul-first-journey',
  partNumber: 1,
  totalParts: 2,
  nextPart: 'paul-journey-1b',
  tags: ['mission', 'gentiles', 'persecution', 'church-planting'],
  
  milestones: [
    {
      id: 'paul1a-antioch',
      name: 'Antioch - Sent Out',
      shortName: 'Antioch (Start)',
      description: 'The church in Antioch fasts, prays, and sets apart Paul and Barnabas for missionary work.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 36.1408, lng: 36.1638 },
      order: 0,
      scriptures: [
        {
          reference: 'Acts 13:2-3',
          text: 'While they were worshiping the Lord and fasting, the Holy Spirit said, "Set apart for me Barnabas and Saul for the work to which I have called them." So after they had fasted and prayed, they placed their hands on them and sent them off.',
          version: 'NIV',
          tags: ['calling', 'mission', 'holy-spirit'],
        },
      ],
      historicalContext: 'Antioch was the third-largest city in the Roman Empire and became the launching point for missions to the Gentile world.',
      imageUrl: '/assets/milestones/antioch-gate.jpg',
      reflectionPrompt: 'What is God calling you to be "set apart" for?',
    },
    {
      id: 'paul1a-salamis',
      name: 'Salamis - First Stop in Cyprus',
      shortName: 'Salamis',
      description: 'Paul and Barnabas land in Cyprus and begin preaching in the synagogues.',
      distanceFromStart: 72000,
      percentOfJourney: 50,
      location: { lat: 35.1858, lng: 33.9025 },
      order: 1,
      scriptures: [
        {
          reference: 'Acts 13:5',
          text: 'When they arrived at Salamis, they proclaimed the word of God in the Jewish synagogues.',
          version: 'NIV',
          tags: ['preaching', 'synagogue'],
        },
      ],
      historicalContext: 'Salamis was Cyprus\' largest city and main port. Paul followed his pattern: preach to Jews first, then Gentiles.',
      imageUrl: '/assets/milestones/cyprus-harbor.jpg',
      reflectionPrompt: 'Where is God sending you to share His word?',
    },
    {
      id: 'paul1a-paphos',
      name: 'Paphos - Blinding the Sorcerer',
      shortName: 'Paphos',
      description: 'Paul confronts Elymas the sorcerer and strikes him blind. The proconsul believes.',
      distanceFromStart: 145000,
      percentOfJourney: 100,
      location: { lat: 34.9208, lng: 33.6290 },
      order: 2,
      scriptures: [
        {
          reference: 'Acts 13:11-12',
          text: 'Now the hand of the Lord is against you. You are going to be blind for a time, not even able to see the light of the sun." Immediately mist and darkness came over him... When the proconsul saw what had happened, he believed, for he was amazed at the teaching about the Lord.',
          version: 'NIV',
          tags: ['power', 'opposition', 'conversion'],
        },
      ],
      historicalContext: 'This is the first recorded conversion of a Roman official. It\'s also where Saul starts being called Paul - his Roman name.',
      imageUrl: '/assets/milestones/paphos-ruins.jpg',
      reflectionPrompt: 'What opposition have you faced when sharing your faith?',
    },
  ],
};

// ============================================================================
// ADVENT/SEASONAL JOURNEYS
// ============================================================================

export const MARY_JOSEPH_BETHLEHEM: Journey = {
  id: 'mary-joseph-bethlehem',
  name: 'Journey to Bethlehem',
  subtitle: 'Mary and Joseph\'s journey for the census',
  description: 'Walk with Mary and Joseph from Nazareth to Bethlehem. Experience the journey of expectant parents traveling for Caesar\'s census, not knowing they carry the King of Kings.',
  category: 'new_testament',
  difficulty: 'intermediate',
  totalDistance: 150000, // 150km
  estimatedDays: 31,
  startLocation: { lat: 32.7041, lng: 35.2981 }, // Nazareth
  endLocation: { lat: 31.7054, lng: 35.2024 }, // Bethlehem
  featuredImageUrl: '/assets/journeys/bethlehem/hero.jpg',
  thumbnailUrl: '/assets/journeys/bethlehem/thumb.jpg',
  isFeatured: false,
  isNew: true,
  order: 100,
  seasonal: {
    season: 'advent',
    startDate: '11-27', // Day after Thanksgiving typically
    endDate: '12-25',
  },
  tags: ['advent', 'christmas', 'nativity', 'hope'],
  
  milestones: [
    {
      id: 'bethlehem-nazareth',
      name: 'Nazareth - The Journey Begins',
      shortName: 'Nazareth (Start)',
      description: 'Mary, nine months pregnant, prepares for the long journey south. Joseph leads his young wife toward Bethlehem.',
      distanceFromStart: 0,
      percentOfJourney: 0,
      location: { lat: 32.7041, lng: 35.2981 },
      order: 0,
      scriptures: [
        {
          reference: 'Luke 2:4-5',
          text: 'So Joseph also went up from the town of Nazareth in Galilee to Judea, to Bethlehem the town of David, because he belonged to the house and line of David. He went there to register with Mary, who was pledged to be married to him and was expecting a child.',
          version: 'NIV',
          tags: ['obedience', 'journey', 'expectation'],
        },
      ],
      historicalContext: 'The Roman census required people to return to their ancestral homes. For Joseph, this meant Bethlehem, city of David.',
      imageUrl: '/assets/milestones/nazareth-departure.jpg',
      reflectionPrompt: 'What difficult journey is God asking you to take in obedience?',
    },
    {
      id: 'bethlehem-midway',
      name: 'Samaria - The Long Road',
      shortName: 'Through Samaria',
      description: 'The difficult middle section. Mary and Joseph trust God with every step.',
      distanceFromStart: 75000,
      percentOfJourney: 50,
      location: { lat: 32.2733, lng: 35.2892 },
      order: 1,
      scriptures: [
        {
          reference: 'Isaiah 7:14',
          text: 'Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.',
          version: 'NIV',
          tags: ['prophecy', 'immanuel', 'promise'],
        },
      ],
      historicalContext: 'This journey would have taken 3-4 days on foot. Mary rode a donkey, but the journey was still exhausting for a woman about to give birth.',
      imageUrl: '/assets/milestones/dusty-road-donkey.jpg',
      reflectionPrompt: 'How do you trust God in the middle of difficult journeys?',
    },
    {
      id: 'bethlehem-arrival',
      name: 'Bethlehem - No Room at the Inn',
      shortName: 'Bethlehem',
      description: 'They arrive. No room anywhere. A stable becomes the birthplace of the King.',
      distanceFromStart: 150000,
      percentOfJourney: 100,
      location: { lat: 31.7054, lng: 35.2024 },
      order: 2,
      scriptures: [
        {
          reference: 'Luke 2:6-7',
          text: 'While they were there, the time came for the baby to be born, and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.',
          version: 'NIV',
          tags: ['birth', 'humble', 'manger', 'incarnation'],
        },
      ],
      historicalContext: 'Bethlehem means "house of bread." How fitting that Jesus, the Bread of Life, was born here and laid in a feeding trough.',
      imageUrl: '/assets/milestones/bethlehem-stable.jpg',
      reflectionPrompt: 'Where is Jesus being born in your life right now?',
    },
  ],
};

// ============================================================================
// EXPORT ALL JOURNEYS (for easy importing)
// ============================================================================

export const ALL_JOURNEYS: Journey[] = [
  // Beginner (10-50km)
  ROAD_TO_EMMAUS,
  JERICHO_TO_JERUSALEM,
  
  // Intermediate (50-150km)
  EXODUS_PART_1,
  EXODUS_PART_2,
  PAUL_JOURNEY_1A,
  MARY_JOSEPH_BETHLEHEM,
  
  // Advanced (150-300km)
  EXODUS_PART_3,
  JESUS_GALILEE,
];

// Filter helpers
export const getJourneysByDifficulty = (difficulty: Journey['difficulty']) => {
  return ALL_JOURNEYS.filter(j => j.difficulty === difficulty);
};

export const getJourneysByCategory = (category: Journey['category']) => {
  return ALL_JOURNEYS.filter(j => j.category === category);
};

export const getFeaturedJourneys = () => {
  return ALL_JOURNEYS.filter(j => j.isFeatured);
};

export const getSeasonalJourneys = (season: 'advent' | 'lent' | 'easter') => {
  return ALL_JOURNEYS.filter(j => j.seasonal?.season === season);
};

export const getJourneyById = (id: string) => {
  return ALL_JOURNEYS.find(j => j.id === id);
};

// Get next journey in a series
export const getNextJourneyInSeries = (currentJourneyId: string): Journey | null => {
  const current = getJourneyById(currentJourneyId);
  if (!current?.nextPart) return null;
  return getJourneyById(current.nextPart) || null;
};