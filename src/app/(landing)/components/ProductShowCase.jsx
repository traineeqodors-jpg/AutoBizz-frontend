import ProductCard from "./ProductCard";

export default function ProductShowCase() {
  const PRODUCTS = [
    {
      img: "/AIReceptionist.jpg",
      title: "Deploy your AI receptionist",
      desc: "Rapidly set up 24/7 voice agents that answer calls instantly using document knowledge base.",
      features: [
        {
          label: "Rapid Deployment",
          text: "Activate a dedicated AI phone number in minutes.",
        },
        {
          label: "Knowledge-Based Responses",
          text: "Your AI agent learns directly from your uploaded documents.",
        },
        {
          label: "Human-Like Interaction",
          text: "Uses advanced speech-to-text and lifelike voice synthesis.",
        },
      ],
    },
    {
      img: "/AIInteraction.jpg",
      title: "Automate Customer interactions",
      desc: "Use AI automation to triage inquiries, answer FAQs, and route conversations without human intervention.",
      features: [
        {
          label: "Automated Triage",
          text: "AI categorizes inquiries and handles FAQs without any human intervention.",
        },
        {
          label: "Multilingual Capabilities",
          text: "Support your global customer base by communicating in multiple languages.",
        },
      ],
    },
    {
      img: "/SOPVideo.png",
      title: "Generate AI Training Videos",
      desc: "Transform your documents into structured step-by-step procedures and polished video tutorials.",
      features: [
        {
          label: "Document to Video",
          text: "Transform your text-based manuals and business documents into structured, step-by-step training videos.",
        },
        {
          label: "Easy Employee Onboarding",
          text: "Generate polished tutorials using AI video avatars to ensure your team learns processes with ease.",
        },
      ],
    },
    {
      img: "/LeadToMeeting.png",
      title: "Convert Leads to Meetings",
      desc: "Connect with high-potential leads by letting AI qualify them and schedule meetings directly.",
      features: [
        {
          label: "Smart Lead Qualification",
          text: "Let AI vet incoming leads and identify 'high-confidence' buyers based on their interactions. ",
        },
        {
          label: "Hands-Free Booking",
          text: "High-potential leads are automatically scheduled directly onto your Google Calendar. ",
        },
      ],
    },
  ];
  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-10">
        <div className="flex items-end justify-between border-b border-gray-400 pb-4">
          <h2 className="text-xl font-bold text-text">Our Solutions</h2>
        </div>

        {/* Changed grid to 3 columns on larger screens for smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={index}
              img={product.img}
              title={product.title}
              desc={product.desc}
              // Pass the features array to the ProductCard,
              // which will then pass it to the InfoDialog
              features={product.features}
            />
          ))}
        </div>
      </div>
    </>
  );
}
