export default function Problems() {
  const items = [
    "何から始めればよいか、見当がつかない",
    "成果が出るか分からないものに、投資ができない",
    "業務にフィットしたAIシステムを開発・導入したいが、高額な開発費は避けたい",
  ];

  return (
    <section id="problems" className="bg-white/80">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl text-center">
          AIシステムの開発・導入で、こんなお悩みはありませんか？
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
