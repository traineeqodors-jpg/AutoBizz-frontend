import ReviewCard from "./ReviewCard";

export default function ClientReviews() {
  return (
    <>
      <div className="max-w-6xl p-4 sm:p-8 mx-auto space-y-10">
        <h2 className="text-2xl font-bold text-center text-text tracking-tight">
          Trusted by Industry Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReviewCard
            name="David Chen"
            role="CEO, TechFlow"
            text="The voice latency is unbelievable. It sounds more human than our previous outsourced support."
          />
          <ReviewCard
            name="Sarah Jenkins"
            role="Ops Manager, RetailGo"
            text="Integrating our SOPs took minutes. Our customer satisfaction score jumped by 40% in one month."
          />
          <ReviewCard
            name="Mike Ross"
            role="Director, FinSecure"
            text="Finally, an AI solution that actually understands context and doesn't hallucinate. Absolute game changer."
          />
        </div>
      </div>
    </>
  );
}
