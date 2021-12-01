interface PageSectionProps {
  sectionTitle: String;
}

const PageSection: React.FC<PageSectionProps> = ({ children, sectionTitle }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl pt-3 mb-3 font-bold">{sectionTitle}</h2>
      <div className="rounded-lg shadow-xl bg-white p-6">
        {children}
      </div>
    </section>
  );
};

export default PageSection;
