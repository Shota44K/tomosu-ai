export default function Problems() {
  const items = [
    "何から始めればよいか、見当がつかない",
    "成果が出るか分からないものに、投資ができない",
    "業務にフィットしたAIシステムを開発・導入したいが、高額な開発費は避けたい",
  ];

  return (
    <section id="problems" className="bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl font-bold text-primary md:text-3xl text-center">
          <span className="hidden md:inline">
            AIシステムの開発・導入で、こんなお悩みはありませんか？
          </span>
          <span className="block md:hidden">
            AIシステムの開発・導入で、
          </span>
          <span className="block md:hidden">
            こんなお悩みはありませんか？
          </span>
        </h2>
        <ul className="mt-6 space-y-4 text-base md:text-lg">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-700">
              <span className="text-accent leading-none">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
