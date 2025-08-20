import { Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower communities through sustainable education, health, and development programs that create lasting positive change and break cycles of poverty.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'A world where every individual has access to quality education, healthcare, and opportunities to reach their full potential regardless of their background.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'We are driven by integrity, compassion, excellence, and inclusivity in everything we do, ensuring transparency and accountability in all our programs.'
  }
];

export default function Mission() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Driven by Purpose, Guided by{' '}
            <span className="text-gradient">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Our foundation is built on the belief that sustainable change begins with empowering communities 
            through education, health initiatives, and meaningful opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`text-center animate-slide-up card-hover ${
                  index === 1 ? 'lg:scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white p-8 shadow-lg h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-brown 
                                  flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              Join Our Mission
            </h3>
            <p className="text-lg text-gray-600 mb-6 font-light">
              Together, we can create lasting change and build stronger, more resilient communities. 
              Your support makes a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Involved</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}