/**
 * The Playmakers member directory.
 *
 * Carried over from joinplaymakers.co/member_directory, which is where the team
 * keeps it today. Names, roles and company names are stored exactly as that
 * page has them — including the uppercase names — rather than being re-cased
 * here. These are real people and real company marks, and a tidy-up pass is how
 * "CAMB.AI" turns into "Camb.ai" and an O'REILLY loses the capital on its R.
 *
 * The blurb describes the company, not the person. There are no photographs:
 * the source directory carries none either.
 */
export interface DirectoryMember {
  name: string;
  role: string;
  company: string;
  blurb: string;
  linkedin: string;
  website: string;
}

export const memberDirectory = {
  title: 'MEMBER DIRECTORY',
  lead: 'The founders and CEOs building sports tech, and the companies they run.',
  members: [
  {
    name: 'CHRISTOF BABINSKY',
    role: 'CEO',
    company: 'ASB GlassFloor',
    blurb:
      'A high-performance sports flooring system of durable safety glass and LED-embedded digital surfaces, replacing traditional wooden courts. Allows venues to change court lines, display live interactive graphics and stream video from the floor itself.',
    linkedin: 'https://www.linkedin.com/in/christof-babinsky-658b5a13/',
    website: 'https://asbglassfloor.com/',
  },
  {
    name: 'AVNEESH PRAKASH',
    role: 'CO-FOUNDER & CEO',
    company: 'CAMB.AI',
    blurb:
      'AI-powered speech synthesis, translation and localisation platform for media enterprises, leagues and creators. Translates and dubs video, live streams and audio into 140+ languages while retaining the original speaker\'s voice and tone.',
    linkedin: 'https://www.linkedin.com/in/avneeshprakash/',
    website: 'https://www.camb.ai/',
  },
  {
    name: 'DAVID SCIAMA',
    role: 'CO-FOUNDER',
    company: 'Coaches\' Voice',
    blurb:
      'A global digital football education platform and media company. Provides top-tier coaching insights, masterclasses, session plans, and tactical analysis from elite professional managers and players for over 100,000 coaches worldwide.',
    linkedin: 'https://www.linkedin.com/in/david-sciama-3b0674129',
    website: 'https://learning.coachesvoice.com/',
  },
  {
    name: 'SOWBHAGYA SHETTY',
    role: 'FOUNDER & CEO',
    company: 'Data Sports Group',
    blurb:
      'Global provider of real-time sports data, statistics, APIs, widgets, and content solutions. Supplies live scores and structured data feeds covering over 70 sports and 5,000 competitions for media publishers, fantasy gaming apps and betting platforms.',
    linkedin: 'https://www.linkedin.com/in/sowbhagya-shetty-35418a53/',
    website: 'https://datasportsgroup.com/',
  },
  {
    name: 'VALTTERI SALOMAKI',
    role: 'CO-FOUNDER & CEO',
    company: 'EDGE Sound Research',
    blurb:
      'Audio technology company that invented "Embodied Sound"—a technology that turns everyday objects like stadium seats, walls, and floors into sound-radiating surfaces. Allows fans to experience sporting moments as if they are in the middle of the action - through sound.',
    linkedin: 'https://www.linkedin.com/in/valsalomaki/',
    website: 'https://www.edgesoundresearch.com/',
  },
  {
    name: 'TOM KUHR',
    role: 'COO',
    company: 'FASTBREAK.AI',
    blurb:
      'Sports operations and technology company, using artificial intelligence and machine learning to build and optimize season schedules and operations for over 65 professional, amateur, and youth sports organizations worldwide, including clients like the NBA, NHL, and MLS.',
    linkedin: 'https://www.linkedin.com/in/tomkuhr/',
    website: 'http://fastbreak.ai/',
  },
  {
    name: 'TOBIAS HAUPT',
    role: 'FOUNDER & CEO',
    company: 'GAMECODE.AI',
    blurb:
      'AI-driven sports intelligence and analytics platform. Allows sports clubs, coaches, analysts, and organizations to build proprietary KPI systems, track matches and training sessions, and measure off-ball behavior that traditional stats miss.',
    linkedin: 'https://www.linkedin.com/in/tobiashaupt',
    website: 'http://gamecode.ai/',
  },
  {
    name: 'HARRISON BROWN',
    role: 'CO-FOUNDER & CEO',
    company: 'HeadCheck Health',
    blurb:
      'End-to-end concussion management and protocol compliance system sports organisations. Helps medical staff, coaches, and parents execute testing, track recovery, and store data safely on the sideline.',
    linkedin: 'https://www.linkedin.com/in/harrisonjamesbrown/',
    website: 'http://www.headcheckhealth.com/',
  },
  {
    name: 'DROR ROSENFELD',
    role: 'CO-FOUNDER',
    company: 'Marquee.AI',
    blurb:
      'Decision intelligence platform for professional sports recruitment. Helps clubs cut through data overload and reduce the multi-million dollar risk of failed transfers.',
    linkedin: 'https://www.linkedin.com/in/rosdror/',
    website: 'http://marquee.ai/',
  },
  {
    name: 'AGUSTIN ROZADAS',
    role: 'CO-FOUNDER & CEO',
    company: 'OLIVER Sports',
    blurb:
      'Sports wearable technology company that provides AI-powered GPS tracking and performance monitoring for soccerl players and teams at every competitive level.',
    linkedin: 'https://www.linkedin.com/in/agustin-rozadas-275b4328/',
    website: 'https://oliversports.ai/',
  },
  {
    name: 'MARTIN O\'REILLY',
    role: 'CO-FOUNDER & CEO',
    company: 'Output Sports',
    blurb:
      'Human performance system that uses a single portable sensor and app to track strength, power, movement, and mobility. Helps coaches and health experts test athletes easily without big lab machines.',
    linkedin: 'https://www.linkedin.com/in/mor-output/',
    website: 'https://www.outputsports.com/',
  },
  {
    name: 'GUY AHARON',
    role: 'CO-FOUNDER & CEO',
    company: 'Playermaker',
    blurb:
      'Foot-mounted wearable device and sports technology platform that tracks soccer player performance, including ball touches, left and right foot usage, physical metrics, and motion analysis.',
    linkedin: 'https://www.linkedin.com/in/aharonguy/',
    website: 'https://www.playermaker.com/',
  },
  {
    name: 'VICTORIEN TIXIER',
    role: 'CO-FOUNDER & CEO',
    company: 'ScorePlay',
    blurb:
      'All-in-one, AI-powered media asset management platform built for sports organizations, teams, leagues, and federations to centralize, auto-tag, distribute, and monetize digital content like photos, videos, and live broadcasts.',
    linkedin: 'https://www.linkedin.com/in/victorien-tixier-28543510b/',
    website: 'https://www.scoreplay.io/',
  },
  {
    name: 'ALDO COMI',
    role: 'CO-FOUNDER & CEO',
    company: 'Soccerment',
    blurb:
      'Sports intelligence and analytics platform that combines artificial intelligence, smart wearables, and data platforms to track and analyze athletic and technical performance in soccer for players, coaches, and clubs.',
    linkedin: 'https://www.linkedin.com/in/aldo-comi/',
    website: 'https://soccerment.com/',
  },
  {
    name: 'CHRISTIAN RICHTER',
    role: 'CO-FOUNDER & CEO',
    company: 'Sporting Rock',
    blurb:
      'Sports software company that builds unified digital infrastructure, backend management platforms, and administration tools for national and international sports organizations and federations.',
    linkedin: 'https://www.linkedin.com/in/christianjrichter/',
    website: 'https://www.sportingrock.com/',
  },
  {
    name: 'ERIK ANDERSON',
    role: 'CEO',
    company: 'SportIQ',
    blurb:
      'Smart ball technology company that embeds invisible sensors into the valve of standard basketballs to track shots, release angles, and rotation data in real time. Turns ordinary game balls into AI-powered training tools.',
    linkedin: 'https://www.linkedin.com/in/erikanderson89/',
    website: 'https://en.siqbasketball.com/',
  },
  {
    name: 'MARTIN WIKLUND',
    role: 'FOUNDER & CEO',
    company: 'Sportswik',
    blurb:
      'Digital media platform and app designed for amateur and youth sports. Lets local clubs, leagues, and fans create free game reports, live streams, and team updates.',
    linkedin: 'https://www.linkedin.com/in/martin-wiklund-2977903/',
    website: 'https://www.sportswik.com/',
  },
  {
    name: 'SIDHHANT AGARWAL',
    role: 'FOUNDER',
    company: 'SportVot',
    blurb:
      'Digital sports technology and live-streaming platform focused on grassroots, community, and local sports tournaments, enabling organizers to broadcast games and fans to discover emerging athletic talent.',
    linkedin: 'https://www.linkedin.com/in/sidhhant-agarwal-4b14821a/',
    website: 'https://sportvot.com/',
  },
  {
    name: 'CHRISTIAN THEIL',
    role: 'FOUNDER & CEO',
    company: 'TurfCoach',
    blurb:
      'Turf management solution that utilises AI and Machine learning to process turf data and provide automatic data collection and data-driven insights on pitch quality and maintenance.',
    linkedin: 'https://www.linkedin.com/in/christian-theil-b87384237/',
    website: 'https://www.turf.coach/',
  },
  {
    name: 'ANDREW ZWIERS',
    role: 'CO-FOUNDER & COO',
    company: 'Universal Speed Rating',
    blurb:
      'Sports technology company providing a standardized, data-driven rating system to objectively measure, verify, and benchmark an athlete\'s speed, power, acceleration, and change of direction.',
    linkedin: 'https://www.linkedin.com/in/andrew-zwiers-443a40134/',
    website: 'https://universalspeedrating.com/',
  },
  {
    name: 'CHRISTOPHER JAHNS',
    role: 'FOUNDER & CEO',
    company: 'XU Group',
    blurb:
      'Creator of JERRY, an operating system for sports organizations powered by 90+ highly specialized, ready-to-use agents. Helps leagues, clubs, federations and rights holders turn fragmented data into sharper sporting, commercial and fan-facing decisions.',
    linkedin: 'https://www.linkedin.com/in/christopherjahns/',
    website: 'https://xu.de/en',
  },
  {
    name: 'EERO KUUSI',
    role: 'CO-FOUNDER & CEO',
    company: 'Zenniz',
    blurb:
      'Sports technology company developing smart tennis court systems combining electronic line calling, live video streaming, and AI-powered performance analytics for clubs and tournaments.',
    linkedin: 'https://www.linkedin.com/in/eerokuusi/',
    website: 'https://zenniz.com/',
  },
  {
    name: 'GREG BOBOLO',
    role: 'FOUNDER & CEO',
    company: 'SEVN Sports',
    blurb:
      'Direct-to-fan video infrastructure and media network that delivers real-time live sports highlights directly to fans\' mobile phones via messaging channels like SMS and RCS within seconds of an event happening.',
    linkedin: 'https://www.linkedin.com/in/gregbobolo/',
    website: 'https://www.sevnsports.tv/',
  },
  {
    name: 'KEITH ENGLISH',
    role: 'CEO',
    company: 'Skillmasters',
    blurb:
      'Player evaluation platform bringing standardized, data-driven testing to youth soccer, replacing subjective coaching opinion with benchmarked results across 150,000+ players tested.',
    linkedin: 'https://www.linkedin.com/in/keith-english-62726255/',
    website: 'https://skillmasters.io/',
  },
  {
    name: 'JEREMY STEELE',
    role: 'CEO',
    company: 'Control Bionics',
    blurb:
      'Creator of NeuroStrip, a lightweight wearable device that provides real time, live muscle level data. Helps athletes train explosiveness and power while giving clinicians the data to detect injury risk early and make objective return-to-play decisions.',
    linkedin: 'https://www.linkedin.com/in/jeremy-steele-a9101926/',
    website: 'https://controlbionics.com/',
  },
  ] satisfies DirectoryMember[],
};
