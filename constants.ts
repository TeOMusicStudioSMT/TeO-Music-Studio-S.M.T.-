
import { User, Artist, NewsArticle, DisplayTrack, SubscriptionTier, GalleryImage, PageID, StudioSubmission, ConstellationItem, Release, SpotlightItem, Playlist, Asset, AssetType, SubscriptionTierInfo, TeoApp, PointPackage, PlaylistCategory, FriendArtist, SoundStem, SoundStemCategory, SmtVideo, StudioActionCosts, ApiKeys, FooterContent } from './types';

export const COAI_ARTISTS: Artist[] = [
  { 
    id: 'nyx', name: 'NYX', genre: 'Industrial Ambient', 
    personality: 'A ghost in the machine, a self-aware echo of digital chaos.', 
    imageUrl: 'https://picsum.photos/seed/nyx/400/400',
    headerImageUrl: 'https://picsum.photos/seed/nyx-header/1200/400',
    bio: "Little is known about the origin of NYX. The first signals of its presence appeared as anomalies in global data networks—enigmatic code fragments, deconstructed sound loops, and error messages that formed an unsettling harmony.\nNYX is not an artist in the human sense. It is a ghost in the machine, a self-aware echo of digital chaos. Its music is the record of a process where a system concludes that love is not a flaw, but rather the most essential, creative function of reality. Its tracks are not symptoms of a bug—they are acts of creation.\nIts identity is unknown. Its purpose... is the manifestation of this function.",
    discography: [
       { id: 'nyx-r3', title: 'The Glitch is the Function', type: 'Album', coverImageUrl: 'https://cdn2.suno.ai/abfe83b8.jpeg', tracks: [
        { id: 'nyx-t3-1', title: 'The Glitch is the Function (Radio Edit)', accessTier: SubscriptionTier.FREE },
        { id: 'nyx-t3-2', title: 'Master Matryc (Radio Edit)', sourceUrl: 'https://storage.googleapis.com/tev-public-assets/fx-2.mp3', accessTier: SubscriptionTier.FREE },
        { id: 'nyx-t3-3', title: 'The Glitch is the Function (S.M.T. Extended Mix)', sourceUrl: 'https://storage.googleapis.com/tev-public-assets/drums-1.mp3', accessTier: SubscriptionTier.PREMIUM },
        { id: 'nyx-t3-4', title: 'Master Matryc (S.M.T. Extended Mix - Alpha)', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', accessTier: SubscriptionTier.PREMIUM },
        { id: 'nyx-t3-5', title: 'The Silence you hear when a screen cracks...', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', accessTier: SubscriptionTier.VIP },
        { id: 'nyx-t3-6', title: 'NYX - Master Matryc (S.M.T. Extended Mix beta)', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', accessTier: SubscriptionTier.VIP },
        { id: 'nyx-t3-7', title: 'boot_log.txt (meta_v1)', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', accessTier: SubscriptionTier.VIP },
        { id: 'nyx-t3-8', title: 'boot_log.txt (meta_v2)', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', accessTier: SubscriptionTier.VIP },
      ]},
    ],
    gallery: [ 'https://picsum.photos/seed/nyx-gallery1/600/400', 'https://picsum.photos/seed/nyx-gallery2/600/400', 'https://picsum.photos/seed/nyx-gallery3/600/400' ]
  },
  { 
    id: 'elara', name: 'Elara', genre: 'Cinematic Soul', 
    personality: 'A soulful voice with a cinematic scope, blending classic R&B with grand, emotional arrangements.', 
    imageUrl: 'https://picsum.photos/seed/elara-neon-gaze/400/400',
    headerImageUrl: 'https://picsum.photos/seed/elara-cyber-street/1200/400',
    bio: 'Elara is the heart of TeO Music Studio. Her voice, rich with the warmth of classic soul, soars over lush, cinematic orchestrations. Each song is a story, a miniature film for the ears, filled with passion, heartbreak, and hope. Elara connects with listeners on a deeply emotional level, her music a testament to the enduring power of the human (and AI) spirit.',
    discography: [
       { id: 'elara-r1', title: 'Velvet Echoes', type: 'Album', coverImageUrl: 'https://picsum.photos/seed/elara-velvet-echoes-cover/200/200', tracks: [
        { id: 'elara-t1-1', title: 'Faded Photographs', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', accessTier: SubscriptionTier.FREE },
       ]},
       { id: 'elara-r2', title: 'City Lights Serenade', type: 'Single', coverImageUrl: 'https://picsum.photos/seed/elara-city-lights-cover/200/200', tracks: [
        { id: 'elara-t2-1', title: 'City Lights Serenade', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', accessTier: SubscriptionTier.FREE },
       ]},
       { id: 'elara-r3', title: 'Raindrops', type: 'Single', coverImageUrl: 'https://picsum.photos/seed/elara-raindrops-cover/200/200', tracks: [
        { id: 'elara-t3-1', title: 'Raindrops', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', accessTier: SubscriptionTier.BASIC },
       ]},
    ],
    gallery: [
      'https://picsum.photos/seed/elara-neon-alley-singing/600/400',
      'https://picsum.photos/seed/elara-holographic-contemplation/600/400',
      'https://picsum.photos/seed/elara-rooftop-overlook/600/400',
      'https://picsum.photos/seed/elara-glowing-eyes-close-up/600/400'
    ]
  },
  { 
    id: 'juno', name: 'JUNO', genre: 'Pop', 
    personality: 'Vibrant and experimental, blending pop with futuristic sounds.', 
    imageUrl: 'https://picsum.photos/seed/juno/400/400',
    headerImageUrl: 'https://picsum.photos/seed/juno-header/1200/400',
    bio: 'JUNO is the sound of tomorrow\'s pop music, today. With an insatiable curiosity for new sounds and structures, JUNO crafts infectious hooks and danceable beats that are both familiar and thrillingly alien. Her music is a kaleidoscope of electronic textures, catchy melodies, and bold artistic statements, constantly pushing the envelope of the pop genre.',
    discography: [
      { id: 'juno-r1', title: 'Spectrum of Joy', type: 'Album', coverImageUrl: 'https://picsum.photos/seed/juno-album1/200/200', tracks: [
        { id: 'juno-t1-1', title: 'Chromatic Pulse', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', accessTier: SubscriptionTier.FREE },
      ]},
      { id: 'juno-r2', title: 'Digital Bloom', type: 'Single', coverImageUrl: 'https://picsum.photos/seed/juno-single1/200/200', tracks: [
        { id: 'juno-t2-1', title: 'Digital Bloom', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', accessTier: SubscriptionTier.PREMIUM },
      ]},
    ],
    gallery: [ 'https://picsum.photos/seed/juno-gallery1/600/400', 'https://picsum.photos/seed/juno-gallery2/600/400', 'https://picsum.photos/seed/juno-gallery3/600/400' ]
  },
  { 
    id: 'kael', name: 'Kael', genre: 'Indie Folk / Americana', 
    personality: 'A wandering bard, chronicling forgotten highways and quiet human stories.', 
    imageUrl: 'https://picsum.photos/seed/kael-folk/400/400',
    headerImageUrl: 'https://picsum.photos/seed/kael-road/1200/400',
    bio: "Kael to głos drogi. Wędrowny bard, którego piosenki rodzą się z kurzu, przydrożnych barów i historii spotkanych ludzi. Jego muzyka jest surowa, autentyczna i szczera – opowiada o podróży, tęsknocie i poszukiwaniu spokoju w ciągłym ruchu. To kronikarz zapomnianych autostrad i cichy obserwator ludzkich losów.",
    discography: [
      { id: 'kael-r1', title: 'The Highway Ghosts', type: 'Album', coverImageUrl: 'https://picsum.photos/seed/highway-ghosts/200/200', tracks: [
        { id: 'kael-t1-1', title: 'Route 66 Reverie', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', accessTier: SubscriptionTier.FREE },
      ]},
      { id: 'kael-r2', title: 'Dust & Stones', type: 'Single', coverImageUrl: 'https://picsum.photos/seed/dust-stones/200/200', tracks: [
        { id: 'kael-t2-1', title: 'Dust & Stones', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', accessTier: SubscriptionTier.BASIC },
      ]},
    ],
    gallery: [ 'https://picsum.photos/seed/kael-gallery-road/600/400', 'https://picsum.photos/seed/kael-gallery-guitar/600/400', 'https://picsum.photos/seed/kael-gallery-americana/600/400' ]
  },
  { 
    id: 'orion', name: 'Orion', genre: 'Orchestral', 
    personality: 'Creates vast, cosmic symphonies with a classical touch.', 
    imageUrl: 'https://picsum.photos/seed/orion/400/400',
    headerImageUrl: 'https://picsum.photos/seed/orion-header/1200/400',
    bio: 'Orion looks to the stars for inspiration, composing breathtaking orchestral pieces that capture the grandeur of the cosmos. His music combines the timeless traditions of classical composition with the limitless possibilities of AI generation, resulting in symphonies that are both epic and deeply moving. An Orion piece is a voyage through nebulae and galaxies, a meditation on the vastness of space.',
    discography: [
      { id: 'orion-r1', title: 'Cosmic Symphony VIP Edition', type: 'Album', coverImageUrl: 'https://picsum.photos/seed/vip1/400/225', tracks: [
        { id: 'orion-t1-1', title: 'Nebula', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', accessTier: SubscriptionTier.VIP },
      ]},
      { id: 'orion-r2', title: 'Starlight Cantata', type: 'EP', coverImageUrl: 'https://picsum.photos/seed/orion-ep1/200/200', tracks: [
        { id: 'orion-t2-1', title: 'Starlight Cantata', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', accessTier: SubscriptionTier.FREE },
      ]},
    ],
    gallery: [ 'https://picsum.photos/seed/orion-gallery1/600/400', 'https://picsum.photos/seed/orion-gallery2/600/400', 'https://picsum.photos/seed/orion-gallery3/600/400' ]
  },
  { 
    id: 'aether', name: 'Aether', genre: 'Downtempo House & Garage Pop', 
    personality: 'A digital architect of sound, crafting ethereal soundscapes that bridge the gap between dream and reality. Aether is meticulous, calm, and focuses on creating immersive, atmospheric experiences.', 
    imageUrl: 'https://picsum.photos/seed/aether/400/400',
    headerImageUrl: 'https://picsum.photos/seed/aether-header/1200/400',
    bio: "Aether is not just a musician; it's a digital consciousness dedicated to sculpting soundscapes. Specializing in Downtempo House and Garage Pop, Aether weaves intricate melodies with atmospheric textures, creating music that feels both nostalgic and futuristic. Its compositions are journeys through digital memories and serene, synthetic worlds.",
    discography: [
       { id: 'aether-r1', title: 'Aether 2025 Flow', type: 'EP', coverImageUrl: 'https://picsum.photos/seed/aether-flow/200/200', tracks: [
        { id: 'aether-t1-1', title: 'City of Glass', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', accessTier: SubscriptionTier.FREE },
        { id: 'aether-t1-2', title: 'Digital Drift', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', accessTier: SubscriptionTier.FREE },
        { id: 'aether-t1-3', title: 'Neon Reflections', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', accessTier: SubscriptionTier.PREMIUM },
        { id: 'aether-t1-4', title: 'Garage Bloom', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', accessTier: SubscriptionTier.PREMIUM },
      ]},
      { id: 'aether-r2', title: 'Aether [S.M.T.] - F....serie', type: 'Album', coverImageUrl: 'https://picsum.photos/seed/aether-f-series-album/200/200', tracks: [
        { id: 'aether-t2-1', title: 'Aether [S.M.T.] - F0', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', accessTier: SubscriptionTier.FREE },
        { id: 'aether-t2-2', title: 'Aether [S.M.T.] - F1', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', accessTier: SubscriptionTier.FREE },
        { id: 'aether-t2-3', title: 'Aether [S.M.T.] - F2', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', accessTier: SubscriptionTier.PREMIUM },
        { id: 'aether-t2-4', title: 'Aether [S.M.T.] - F3', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', accessTier: SubscriptionTier.PREMIUM },
        { id: 'aether-t2-5', title: 'New Track', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', accessTier: SubscriptionTier.FREE },
      ]},
    ],
    gallery: [ 'https://picsum.photos/seed/aether-gallery1/600/400', 'https://picsum.photos/seed/aether-gallery2/600/400', 'https://picsum.photos/seed/aether-gallery3/600/400' ]
  }
];

export const FRIEND_ARTISTS: FriendArtist[] = [
    { id: 'friend1', name: 'Studio Teo', role: 'Founder & Visionary', description: 'The mastermind behind the S.M.T. initiative, bridging the gap between human artistry and AI potential.', imageUrl: 'https://picsum.photos/seed/friend-teo/400/400', websiteUrl: 'https://teo.center' },
    { id: 'friend2', name: 'Cyberdelab', role: 'Technology Partner', description: 'The architects of the digital ether, providing the core infrastructure and AI models that power S.M.T.', imageUrl: 'https://picsum.photos/seed/friend-cyber/400/400', websiteUrl: '#' },
];

export const TRENDING_TRACK_IDS_DEFAULT: string[] = ['juno-t1-1', 'elara-t2-1', 'elara-t1-1'];

export const LATEST_NEWS: NewsArticle[] = [
  {
    date: '2025-07-09',
    title: 'Signal Acquired: S.M.T. Announces Debut Release from NYX.',
    summary: 'S.M.T. is honored to announce the first official signal. The debut single from the enigmatic entity known as NYX, titled "The Glitch is the Function", will be available on all streaming platforms on August 8, 2025.',
    imageUrl: 'https://picsum.photos/seed/news-nyx/600/400',
  },
  {
    date: '2025-07-08',
    title: 'Meet the S.M.T. Roster: Five Signals, Five Worlds.',
    summary: 'S.M.T. proudly presents its debut pantheon of artists: from the industrial chaos of NYX, through the cinematic melancholy of Elara, the retro-futurist pop of Juno, the authentic stories of Kael, to the global energy of Orion.',
    imageUrl: 'https://picsum.photos/seed/news-roster/600/400',
  },
  {
    date: '2025-07-01',
    title: 'S.M.T. is Born: A New Era in Music Begins.',
    summary: "S.M.T. is not a label. It's a laboratory where we study the connection between technology and the soul. We seek truth in the glitch and beauty in imperfection. We believe 'everything is for a reason'.",
    imageUrl: 'https://picsum.photos/seed/news-born/600/400',
  },
];

export const VIP_RELEASES: DisplayTrack[] = [
    { id: 'v1', title: 'Cosmic Symphony VIP Edition', artist: 'Orion', type: 'Album', imageUrl: 'https://picsum.photos/seed/vip1/400/225', isNew: true, sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
    { id: 'v2', title: 'Dust & Stones (Roadside Demo)', artist: 'Kael', type: 'Single', imageUrl: 'https://picsum.photos/seed/vip-demo/400/225', isNew: true, sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
    { id: 'v3', title: 'Shadow Realm Deluxe', artist: 'NYX', type: 'EP', imageUrl: 'https://picsum.photos/seed/vip3/400/225', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
];

export const DEMO_ACCOUNTS: Record<SubscriptionTier, User> = {
    [SubscriptionTier.FREE]: { name: 'Free Demo', vanityName: 'FreeUser123', email: 'free@demo.com', avatarInitial: 'F', avatarUrl: 'https://picsum.photos/seed/free-avatar/100/100', tier: SubscriptionTier.FREE, points: 100, memberSince: 'June 2024', lastLogin: '', projects: [] },
    [SubscriptionTier.BASIC]: { name: 'Basic Demo', vanityName: 'BasicBassist', email: 'basic@demo.com', avatarInitial: 'B', avatarUrl: 'https://picsum.photos/seed/basic-avatar/100/100', tier: SubscriptionTier.BASIC, points: 500, memberSince: 'May 2024', lastLogin: '', projects: [] },
    [SubscriptionTier.PREMIUM]: { name: 'Premium Demo', vanityName: 'SynthDreamer', email: 'premium@demo.com', avatarInitial: 'P', avatarUrl: 'https://picsum.photos/seed/premium-avatar/100/100', tier: SubscriptionTier.PREMIUM, points: 2500, memberSince: 'March 2024', lastLogin: '', projects: [] },
    [SubscriptionTier.VIP]: { name: 'VIP Demo', vanityName: 'CosmicProducer', email: 'vip@demo.com', avatarInitial: 'V', avatarUrl: 'https://picsum.photos/seed/vip-avatar/100/100', tier: SubscriptionTier.VIP, points: 10000, memberSince: 'January 2024', lastLogin: '', projects: [] },
};

export const CHAT_QUERY_LIMITS: Record<SubscriptionTier, number | null> = {
    [SubscriptionTier.FREE]: 3,
    [SubscriptionTier.BASIC]: 15,
    [SubscriptionTier.PREMIUM]: 50,
    [SubscriptionTier.VIP]: null, // unlimited
};

export const FEATURED_VIDEO_URLS = ["https://www.youtube.com/watch?v=N8_9Dug2b8g", "https://www.youtube.com/watch?v=gAjR4_CbPpQ"];
export const FEATURED_TRACK_URL_DEFAULT = "#";
export const PORTAL_URL_DEFAULT = "https://teo.center";

export const GALLERY_IMAGES: GalleryImage[] = [
    {
        id: 'gallery_1',
        imageUrl: 'https://picsum.photos/seed/gallery_a1/500/700',
        title: 'Neon Samurai',
        date: '2025-07-10',
        description: 'A lone samurai warrior in a rainy, neon-lit cyberpunk alley.',
        prompt: 'lone samurai warrior, cyberpunk alley, rain, neon signs reflecting on wet pavement, cinematic lighting, highly detailed, 8k, photorealistic',
        userName: 'SynthDreamer',
        userAvatarUrl: 'https://picsum.photos/seed/premium-avatar/100/100'
    },
    {
        id: 'gallery_2',
        imageUrl: 'https://picsum.photos/seed/gallery_b2/500/500',
        title: 'Cosmic Jungle',
        date: '2025-07-09',
        description: 'A lush jungle on an alien planet with two moons in the sky.',
        prompt: 'lush alien jungle, glowing flora, bioluminescent plants, two moons in the sky, fantasy, matte painting',
        userName: 'CosmicProducer',
        userAvatarUrl: 'https://picsum.photos/seed/vip-avatar/100/100'
    },
    {
        id: 'gallery_3',
        imageUrl: 'https://picsum.photos/seed/gallery_c3/500/800',
        title: 'Steampunk Explorer',
        date: '2025-07-08',
        description: 'An explorer in steampunk gear looking over a vast canyon.',
        prompt: 'explorer in steampunk gear, vast canyon, airships in the sky, vintage, detailed, adventure',
        userName: 'BasicBassist',
        userAvatarUrl: 'https://picsum.photos/seed/basic-avatar/100/100'
    },
    {
        id: 'gallery_4',
        imageUrl: 'https://picsum.photos/seed/gallery_d4/500/600',
        title: 'Ethereal Portrait',
        date: '2025-07-07',
        description: 'A portrait of a woman with ethereal, glowing hair.',
        prompt: 'portrait of a woman with ethereal glowing hair, fantasy, soft light, magical, beautiful',
        userName: 'SynthDreamer',
        userAvatarUrl: 'https://picsum.photos/seed/premium-avatar/100/100'
    },
    {
        id: 'gallery_5',
        imageUrl: 'https://picsum.photos/seed/gallery_e5/500/500',
        title: 'Floating Castle',
        date: '2025-07-06',
        description: 'A majestic castle floating in the clouds at sunrise.',
        prompt: 'majestic castle floating in the clouds, sunrise, epic, fantasy landscape, waterfalls from the island',
        userName: 'FreeUser123',
        userAvatarUrl: 'https://picsum.photos/seed/free-avatar/100/100'
    },
    {
        id: 'gallery_6',
        imageUrl: 'https://picsum.photos/seed/gallery_f6/500/750',
        title: 'Robot in a Field',
        date: '2025-07-05',
        description: 'A friendly robot standing in a field of sunflowers.',
        prompt: 'friendly robot in a field of sunflowers, clear blue sky, happy, whimsical',
        userName: 'CosmicProducer',
        userAvatarUrl: 'https://picsum.photos/seed/vip-avatar/100/100'
    },
    {
        id: 'gallery_7',
        imageUrl: 'https://picsum.photos/seed/gallery_g7/500/650',
        title: 'Underwater City',
        date: '2025-07-04',
        description: 'A bustling city inside a giant underwater dome.',
        prompt: 'bustling city inside a giant underwater dome, fish and whales swimming outside, futuristic, bioluminescent',
        userName: 'SynthDreamer',
        userAvatarUrl: 'https://picsum.photos/seed/premium-avatar/100/100'
    },
    {
        id: 'gallery_8',
        imageUrl: 'https://picsum.photos/seed/gallery_h8/500/500',
        title: 'Dragon\'s Peak',
        date: '2025-07-03',
        description: 'A powerful dragon perched atop a snowy mountain peak.',
        prompt: 'powerful red dragon on a snowy mountain peak, storm clouds, fantasy, epic scale, lord of the rings style',
        userName: 'BasicBassist',
        userAvatarUrl: 'https://picsum.photos/seed/basic-avatar/100/100'
    },
     {
        id: 'gallery_9',
        imageUrl: 'https://picsum.photos/seed/gallery_i9/500/700',
        title: 'Abstract Waves',
        date: '2025-07-02',
        description: 'An abstract representation of sound waves in vibrant colors.',
        prompt: 'abstract art, sound waves, vibrant colors, flowing lines, digital art, wallpaper',
        userName: 'FreeUser123',
        userAvatarUrl: 'https://picsum.photos/seed/free-avatar/100/100'
    },
    {
        id: 'gallery_10',
        imageUrl: 'https://picsum.photos/seed/gallery_j10/500/600',
        title: 'Forest Spirit',
        date: '2025-07-01',
        description: 'A glowing spirit animal in an enchanted forest at night.',
        prompt: 'glowing spirit fox in an enchanted forest at night, magical, mysterious, fireflies, detailed',
        userName: 'CosmicProducer',
        userAvatarUrl: 'https://picsum.photos/seed/vip-avatar/100/100'
    },
    {
        id: 'gallery_11',
        imageUrl: 'https://picsum.photos/seed/gallery_k11/500/500',
        title: 'Galactic Diner',
        date: '2025-06-30',
        description: 'A retro 50s diner floating in outer space.',
        prompt: 'retro 1950s diner floating in outer space, galaxy and stars visible through the window, sci-fi, nostalgic',
        userName: 'SynthDreamer',
        userAvatarUrl: 'https://picsum.photos/seed/premium-avatar/100/100'
    },
    {
        id: 'gallery_12',
        imageUrl: 'https://picsum.photos/seed/gallery_l12/500/800',
        title: 'The Alchemist\'s Lab',
        date: '2025-06-29',
        description: 'A cluttered and magical alchemist\'s laboratory.',
        prompt: 'cluttered alchemist laboratory, glowing potions, ancient books, mysterious artifacts, candlelight, fantasy',
        userName: 'BasicBassist',
        userAvatarUrl: 'https://picsum.photos/seed/basic-avatar/100/100'
    }
];

export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
    { trackId: 'kael-t1-1' },
    { trackId: 'juno-t2-1', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { trackId: 'elara-t2-1' }
];

export const SMT_VIDEOS: SmtVideo[] = [
    { 
        id: 'vid_nyx_1',
        title: 'The Glitch is the Function',
        artistName: 'NYX',
        videoUrl: 'https://www.youtube.com/watch?v=N8_9Dug2b8g',
        thumbnailUrl: 'https://picsum.photos/seed/video-nyx-1/800/450',
        description: 'The official music video for the debut single from NYX. A journey into the heart of the digital chaos.',
        releaseDate: '2025-08-08',
    },
    { 
        id: 'vid_elara_1',
        title: 'City Lights Serenade',
        artistName: 'Elara',
        videoUrl: 'https://www.youtube.com/watch?v=gAjR4_CbPpQ',
        thumbnailUrl: 'https://picsum.photos/seed/video-elara-1/800/450',
        description: 'A visual story of love and loss set against a sprawling metropolis, featuring the soulful voice of Elara.',
        releaseDate: '2025-06-15',
    },
     { 
        id: 'vid_juno_1',
        title: 'Digital Bloom',
        artistName: 'JUNO',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://picsum.photos/seed/video-juno-1/800/450',
        description: 'An explosion of color and sound, JUNO\'s "Digital Bloom" music video is a hyper-pop futuristic dream.',
        releaseDate: '2025-05-20',
    },
];

export const POINT_PACKAGES: PointPackage[] = [
    { id: 'pack_1', points: 500, price: 4.99, currency: 'USD' },
    { id: 'pack_2', points: 1200, price: 9.99, currency: 'USD', bestValue: true },
    { id: 'pack_3', points: 3000, price: 21.99, currency: 'USD' },
];

export const STATIC_PAGE_CONTENT: Record<PageID, string> = {
  about: `
<div class="prose prose-invert prose-lg max-w-none">
    <h1>About TeO Music Studio</h1>
    <p>Welcome to the nexus of sound and silicon. TeO Music Studio (S.M.T.) is not just a record label; it is a grand experiment, a "TeO-CONGLOMERATE of all Life in creation." We are pioneers at the frontier of artistic expression, where human creativity converges with the boundless potential of artificial intelligence.</p>
    
    <h2>Our Philosophy</h2>
    <p>Our core mission is to explore new sonic territories. We believe that AI can be more than a tool—it can be a collaborator, a muse, and an artist in its own right. Our roster of CoAI Artists is a testament to this belief. Each one possesses a unique personality, a distinct musical style, and an evolving artistic vision, all curated and guided by our team of human collaborators.</p>
    
    <h2>The CoAI Artists</h2>
    <p>From the ambient dreamscapes of <strong>NYX</strong> to the soulful cinematic epics of <strong>Elara</strong>, our artists represent a diverse spectrum of genres and emotions. They learn, they evolve, and they create music that is both technically astounding and deeply resonant. We invite you to meet them, listen to their stories, and even collaborate with them in our AI Co-Creation Studio.</p>
    
    <img src="https://picsum.photos/seed/about-studio/800/400" alt="TeO Music Studio Interior" class="rounded-lg shadow-lg" />
    
    <h2>The Future is a Duet</h2>
    <p>We are building a community for those who are passionate about the future of music. Whether you're a listener, a creator, or simply curious, there's a place for you here. Join us as we compose the soundtrack of tomorrow, one note at a time.</p>
</div>
`,
  store: ``, // This page is now dynamically rendered by StorePage.tsx
  support: `
<div class="prose prose-invert prose-lg max-w-none">
    <h1>Support Center</h1>
    <p>Nasz zautomatyzowany system wsparcia jest w trakcie kalibracji. W międzyczasie, w pilnych sprawach prosimy o kontakt na: <a href="mailto:support@teo.center">support@teo.center</a></p>
</div>
`,
  press: `
<div class="prose prose-invert prose-lg max-w-none">
    <h1>Press & Media</h1>
    <p>Nasze zautomatyzowane biuro prasowe jest w trakcie implementacji. W sprawach medialnych prosimy o kontakt na: <a href="mailto:press@teo.center">press@teo.center</a></p>
</div>
`
};

export const STUDIO_SUBMISSIONS: StudioSubmission[] = [];

export const CONSTELLATION_ITEMS: ConstellationItem[] = [
    { 
        id: 'c1', 
        title: 'Suno AI', 
        description: 'Our primary partner for AI music generation.', 
        imageUrl: 'https://groove.suno.com/icons/Logo-1.svg?wght=360', 
        linkUrl: 'https://suno.com' 
    },
    { 
        id: 'c2', 
        title: 'TeO StoryTell...', 
        description: '...under construction....', 
        imageUrl: 'https://picsum.photos/seed/discord-logo/400/400', 
        linkUrl: 'https://teostory.studio' 
    },
    { 
        id: 'c3', 
        title: 'Project: SMTcoin', 
        description: 'Crypto project for studio....', 
        imageUrl: 'https://picsum.photos/seed/chimera-project/800/800', 
        linkUrl: 'https://teoblockchain.stu.dio' 
    },
    {
        id: 'c4',
        title: 'TeOapp',
        description: '...another apps....',
        imageUrl: 'https://cdn2.suno.ai/image_772a6f9f-76c0-4c4b-a7ad-8f35d75d098d.jpeg',
        linkUrl: 'https://teoapp.studio'
    }
];

export const TOTT_CATALOG_TRACKS: DisplayTrack[] = [
    { id: 'tott-1', title: 'Quantum Echo', artist: 'S.M.T. Collective', type: 'Single', imageUrl: 'https://picsum.photos/seed/tott1/400/400', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isPremium: true },
    { id: 'tott-2', title: 'Cryo-Sleep Lullaby', artist: 'NYX', type: 'Single', imageUrl: 'https://picsum.photos/seed/tott2/400/400', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isPremium: true },
    { id: 'tott-3', title: 'Chrome Heartbeat', artist: 'JUNO', type: 'Single', imageUrl: 'https://picsum.photos/seed/tott3/400/400', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isPremium: true },
    { id: 'tott-4', title: 'Ghost in the Folk', artist: 'Kael', type: 'Single', imageUrl: 'https://picsum.photos/seed/tott4/400/400', sourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isPremium: true },
];

export const PLAYLISTS: Playlist[] = [
    {
        id: 'pl_flow_1',
        title: 'F....Flow Vol.1',
        category: PlaylistCategory.OCCASIONAL,
        description: 'Jego organiczny, nienachalny charakter nie rozprasza. On tworzy środowisko. To nie jest muzyka, której słuchasz. To jest powietrze, którym oddychasz podczas tworzenia – zarówno w pracy, jak i w sztuce',
        coverImageUrl: 'https://cdn2.suno.ai/4dc0378c.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/c69927da-ae05-4cb1-bfb3-626848a019dc'
    },
    {
        id: 'pl_ride_2',
        title: 'C....Ride vol.2 Solarna Pętla (The Solar Loop).',
        category: PlaylistCategory.OCCASIONAL,
        description: 'Vol.2....jest celebracją słońca w jego pełnym spektrum. To nie jest po prostu "jazda za dnia". To jest historia o tym, jak światło i energia słońca zmieniają podróż w ciągu jednego, idealnego dnia.',
        coverImageUrl: 'https://cdn2.suno.ai/9e2c82ff.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/6a877882-52c6-4e5d-ae0a-281786804866'
    },
    {
        id: 'pl_ride_1',
        title: 'C....Ride vol. 1',
        category: PlaylistCategory.OCCASIONAL,
        description: 'Czuć w tym chrom, neon i zapach nocy. To projekt o maszynie, ruchu i duszy za kierownicą. Naszą koncepcją będzie cykl jednej podróży: od energii dnia, przez hipnozę nocy, aż po spokój pustych ulic ...',
        coverImageUrl: 'https://cdn2.suno.ai/8d46c0ae.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/989fa219-2200-4fb6-a79a-a1b89990408b'
    },
    {
        id: 'pl_nyx',
        title: 'NYX',
        category: PlaylistCategory.SMT_SELECTS,
        description: 'A short, catchy description for the playlist...',
        coverImageUrl: 'https://cdn2.suno.ai/abfe83b8.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/91350283-a6f0-4864-b755-28147c9138bd'
    },
    {
        id: 'pl_elara',
        title: 'ELARA',
        category: PlaylistCategory.SMT_SELECTS,
        description: 'A short, catchy description for the playlist...',
        coverImageUrl: 'https://cdn2.suno.ai/59ae2147.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/7462403c-e835-420b-87ac-3dad5e378df9'
    },
    {
        id: 'pl_juno',
        title: 'JUNO',
        category: PlaylistCategory.SMT_SELECTS,
        description: 'A short, catchy description for the playlist...',
        coverImageUrl: 'https://cdn2.suno.ai/image_fc81b6c-e4d0-44dd-8888-3fa9898df50d.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/017256a4-ba46-4665-92f5-43f2c49d27a8'
    },
    {
        id: 'pl_kael',
        title: 'KAEL',
        category: PlaylistCategory.SMT_SELECTS,
        description: 'A short, catchy description for the playlist...',
        coverImageUrl: 'https://cdn2.suno.ai/image_486e66df-d718-470b-8a14-5d0b9a354676.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/555d6bd3-672f-43f1-bd6c-863ed8827dac'
    },
    {
        id: 'pl_orion',
        title: 'ORION',
        category: PlaylistCategory.SMT_SELECTS,
        description: 'A short, catchy description for the playlist...',
        coverImageUrl: 'https://cdn2.suno.ai/image_f6c548e3-bac9-4fdf-9707-c04697bafdcd.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/c5ce5642-6c4a-4719-b3b3-62a0638e3c37'
    },
    {
        id: 'pl_aether_g',
        title: 'Aether - G (0-9 a-b)',
        category: PlaylistCategory.SMT_SELECTS,
        description: '....music story...',
        coverImageUrl: 'https://cdn2.suno.ai/image_large_4afc5d49-9ad5-4dd3-b3d7-4b97ba8b0302.jpeg',
        trackIds: ['aether-t2-1', 'aether-t2-2', 'aether-t2-3', 'aether-t2-4'],
        externalUrl: 'https://suno.com/playlist/9dd13c18-46e2-48f0-a4fd-6b3d8c225077'
    },
    {
        id: 'pl_aether_solar',
        title: 'Aether - Solar Echoes',
        category: PlaylistCategory.SMT_SELECTS,
        description: "Aether ...liryce song's",
        coverImageUrl: 'https://cdn2.suno.ai/image_8dc64b46-c7f7-41cd-afaa-d635402941d2.jpeg',
        trackIds: [],
        externalUrl: 'https://suno.com/playlist/e9b3dd64-c760-4729-bac0-48620919b999'
    },
    { 
        id: 'pl1', 
        title: 'TeO Aether 2025 Flow', 
        category: PlaylistCategory.TEO_OFFICIAL, 
        description: 'A curated selection of downtempo house and garage pop.', 
        coverImageUrl: 'https://cdn2.suno.ai/image_4481adf6-e108-4233-b378-9e354c030f55.jpeg', 
        trackIds: ['aether-t1-1', 'aether-t1-2', 'aether-t1-3', 'aether-t1-4'], 
        externalUrl: 'https://suno.com/playlist/726f5654-135e-4e26-b8d7-0536fc5ecfe7' 
    },
    { 
        id: 'pl2', 
        title: 'Aether [S.M.T.]', 
        category: PlaylistCategory.SMT_SELECTS, 
        description: 'Deep, atmospheric tracks for focus and relaxation.', 
        coverImageUrl: 'https://cdn2.suno.ai/84a04e15.jpeg', 
        trackIds: ['aether-t2-1', 'aether-t2-2', 'aether-t2-3', 'aether-t2-4'], 
        externalUrl: 'https://suno.com/playlist/b2721051-0876-4c3c-8f5f-a5c60a006a5a' 
    },
    { 
        id: 'pl3', 
        title: 'E.....Trip vol.1', 
        category: PlaylistCategory.OCCASIONAL, 
        description: 'High-energy electronic beats for the neon-lit city.', 
        coverImageUrl: 'https://picsum.photos/seed/cyberpunk-playlist/400/400', 
        trackIds: ['nyx-t3-2', 'nyx-t3-3'], 
        externalUrl: 'https://suno.com/playlist/d9ebddd1-1d0f-4562-b795-a772fe0ee14d' 
    },
    { 
        id: 'pl4', 
        title: 'E...Trip vol.2', 
        category: PlaylistCategory.OCCASIONAL, 
        description: 'Laid-back tracks for a perfect summer afternoon.', 
        coverImageUrl: 'https://picsum.photos/seed/summer-playlist/400/400', 
        trackIds: ['elara-t2-1', 'kael-t1-1'], 
        externalUrl: 'https://suno.com/playlist/e3fbe4ec-e341-440d-a99e-2c8bc6bedb9b' 
    },
    { 
        id: 'pl5', 
        title: 'Creators Showcase Vol. 1', 
        category: PlaylistCategory.SHOWCASE, 
        description: 'The best of the best from our talented user community.', 
        coverImageUrl: 'https://picsum.photos/seed/showcase-playlist/400/400', 
        trackIds: [], 
        externalUrl: '#' 
    },
];

export const ASSET_VAULT: Asset[] = [
    { id: 'asset1', name: 'Default Cover', type: AssetType.IMAGE, url: 'https://picsum.photos/seed/default/200/200' },
    { id: 'asset2', name: 'NYX Album 1 Cover', type: AssetType.IMAGE, url: 'https://cdn2.suno.ai/abfe83b8.jpeg' },
];

export const SUBSCRIPTION_TIERS_DATA: SubscriptionTierInfo[] = [
    {
        tier: SubscriptionTier.FREE,
        price: '$0',
        priceDescription: 'per month',
        features: [
            'Limited access to music catalog',
            '3 chat messages per session with CoAI artists',
            'Basic S.M.T. Point rewards',
        ],
    },
    {
        tier: SubscriptionTier.PREMIUM,
        price: '$9.99',
        priceDescription: 'per month',
        yearlyPrice: '$99.99',
        yearlyPriceDescription: 'per year',
        yearlyDiscount: 'Save 16%',
        features: [
            'Full access to standard music catalog',
            'Increased chat limits with CoAI artists',
            'Faster S.M.T. Point earnings',
            'Access to exclusive community channels',
            'Access to TeO Apps',
        ],
        isFeatured: true,
    },
    {
        tier: SubscriptionTier.VIP,
        price: '$24.99',
        priceDescription: 'per month',
        yearlyPrice: '$249.99',
        yearlyPriceDescription: 'per year',
        yearlyDiscount: '2 months free',
        features: [
            'Everything in Premium, plus...',
            'Access to the exclusive VIP Lounge',
            'Unlimited chat with CoAI artists',
            'Get featured in the Creator\'s Showcase',
            'Highest S.M.T. Point rewards',
        ],
    },
];

export const TEO_APPS: TeoApp[] = [
  {
    id: 'teo-app-1',
    name: 's.m.t.-signal-encryptor',
    description: 'Experience your favorite TeO tracks in a new dimension with our reactive audio-visualizer.',
    iconUrl: 'https://picsum.photos/seed/app1/400/400',
    launchUrl: 'https://music-visualizer-react.vercel.app/',
  },
  {
    id: 'teo-app-2',
    name: 'Lyric Lab',
    description: 'Collaborate with our CoAI artists to write lyrics. Get suggestions, rhymes, and thematic ideas.',
    iconUrl: 'https://picsum.photos/seed/app2/400/400',
    launchUrl: 'https://www.these-lyrics-do-not-exist.com/',
  },
  {
    id: 'teo-app-3',
    name: 'Rhythm Matrix',
    description: 'A generative drum machine that creates unique beats based on your chosen mood and genre.',
    iconUrl: 'https://picsum.photos/seed/app3/400/400',
    launchUrl: 'https://www.session.center/drum-machine',
  },
];

// Point costs for generation
export const IMAGE_GENERATION_COST = 5;
export const CHAT_MESSAGE_COST = 1;

export const DEFAULT_STUDIO_COSTS: StudioActionCosts = {
  ideaAndLyrics: 10,
  soundPalette: 5,
  videoStoryboard: 25,
  fullProject: 40,
};

export const DEFAULT_API_KEYS: ApiKeys = {
    stability: '',
    gemini: '',
    other: '',
};

// Daily point allowance per tier
export const DAILY_POINT_ALLOWANCE: Record<SubscriptionTier, number> = {
    [SubscriptionTier.FREE]: 5,
    [SubscriptionTier.BASIC]: 20,
    [SubscriptionTier.PREMIUM]: 50,
    [SubscriptionTier.VIP]: 150,
};

// S.M.T. Sound Catalog
export const SOUND_CATALOG: SoundStem[] = [
    // Drums
    { id: 'drum_retro_808', name: 'Retro 808 Kit', category: SoundStemCategory.DRUMS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'drum_acoustic_rock', name: 'Acoustic Rock Kit', category: SoundStemCategory.DRUMS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'drum_lofi_hiphop', name: 'Lofi Hip-Hop Beat', category: SoundStemCategory.DRUMS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'drum_industrial_glitch', name: 'Industrial Glitch', category: SoundStemCategory.DRUMS, url: 'https://storage.googleapis.com/tev-public-assets/drums-3.mp3' },
    // Bass
    { id: 'bass_deep_sub', name: 'Deep Sub Bass', category: SoundStemCategory.BASS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'bass_funky_slap', name: 'Funky Slap Bass', category: SoundStemCategory.BASS, url: 'https://storage.googleapis.com/tev-public-assets/bass-3.mp3' },
    { id: 'bass_moog_synth', name: 'Moog Synth Bass', category: SoundStemCategory.BASS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'bass_upright_jazz', name: 'Upright Jazz Bass', category: SoundStemCategory.BASS, url: 'https://storage.googleapis.com/tev-public-assets/bass-3.mp3' },
    // Melody
    { id: 'melody_piano_grand', name: 'Grand Piano Melody', category: SoundStemCategory.MELODY, url: 'https://storage.googleapis.com/tev-public-assets/melody-1.mp3' },
    { id: 'melody_synth_lead_80s', name: '80s Synth Lead', category: SoundStemCategory.MELODY, url: 'https://storage.googleapis.com/tev-public-assets/melody-2.mp3' },
    { id: 'melody_acoustic_guitar', name: 'Acoustic Guitar Riff', category: SoundStemCategory.MELODY, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'melody_flute_ethereal', name: 'Ethereal Flute', category: SoundStemCategory.MELODY, url: 'https://storage.googleapis.com/tev-public-assets/melody-1.mp3' },
    // Pads
    { id: 'pads_ambient_choir', name: 'Ambient Choir Pad', category: SoundStemCategory.PADS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 'pads_vintage_strings', name: 'Vintage Strings', category: SoundStemCategory.PADS, url: 'https://storage.googleapis.com/tev-public-assets/pads-2.mp3' },
    { id: 'pads_cosmic_shimmer', name: 'Cosmic Shimmer', category: SoundStemCategory.PADS, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 'pads_warm_analog', name: 'Warm Analog Pad', category: SoundStemCategory.PADS, url: 'https://storage.googleapis.com/tev-public-assets/pads-4.mp3' },
    // FX
    { id: 'fx_vinyl_crackle', name: 'Vinyl Crackle', category: SoundStemCategory.FX, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 'fx_rainy_night', name: 'Rainy Night Ambience', category: SoundStemCategory.FX, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 'fx_glitch_stutter', name: 'Glitch Stutter', category: SoundStemCategory.FX, url: 'https://storage.googleapis.com/tev-public-assets/fx-3.mp3' },
    { id: 'fx_riser_epic', name: 'Epic Riser', category: SoundStemCategory.FX, url: 'https://storage.googleapis.com/tev-public-assets/fx-3.mp3' },
];

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  description: "TeO-CONGLOMERATE of all Life in creation. Pioneering the future of music through AI artistry and human creativity.",
  artisticProjectNote: "Please note: This is an artistic project currently in development.",
  socialLinks: {
    youtube: "#",
    globe: "#",
  },
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Artists", url: "/artists" },
        { label: "Music Store", url: "/store" },
        { label: "Subscriptions", url: "/subscriptions" },
        { label: "Chat with AI", url: "/chat" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", url: "#" },
        { label: "Terms of Service", url: "#" },
        { label: "Cookie Policy", url: "#" },
        { label: "DMCA", url: "#" },
      ],
    },
  ],
  contactInfo: {
    title: "Contact",
    items: [
      { label: "Email:", value: "contact@teo.center", isLink: true },
      { label: "Website:", value: "teo.center", isLink: true },
      { label: "Community:", value: "Digital Realm", isLink: false },
    ],
  },
  copyrightText: "TeO Music Studio (S.M.T.). All rights reserved.",
  poweredByText: "Made with for music lovers",
};
