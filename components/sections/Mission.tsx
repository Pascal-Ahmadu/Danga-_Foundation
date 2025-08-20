import { Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower communities through sustainable education, health, and development programs that create lasting positive change and break cycles of poverty. We are committed to building stronger, more resilient communities by providing comprehensive support that addresses root causes of inequality. Our mission extends beyond immediate relief to fostering long-term transformation through capacity building, skills development, and community-driven solutions. We believe in working alongside communities rather than for them, ensuring that every intervention is culturally appropriate and locally sustainable.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'A world where every individual has access to quality education, healthcare, and opportunities to reach their full potential regardless of their background or circumstances. We envision thriving communities where children grow up with hope, families have economic security, and everyone can participate meaningfully in society. Our vision encompasses a future where systemic barriers to progress are dismantled, where innovation and tradition work hand in hand, and where the dignity of every person is recognized and protected. We see a world where communities are self-reliant, environmentally sustainable, and connected to global opportunities while maintaining their unique cultural identities.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'We are driven by integrity, compassion, excellence, and inclusivity in everything we do, ensuring transparency and accountability in all our programs and operations. Our core values include respect for human dignity, commitment to social justice, and belief in the power of collaboration. We practice cultural humility, recognizing that communities are the experts of their own experiences and needs. Innovation guides our approach as we continuously seek creative solutions to complex challenges. We value sustainability in all its forms - environmental, social, and economic - ensuring that our work creates lasting positive impact for future generations. Equity and fairness are at the heart of our decision-making processes.'
  }
];

export default function Mission() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Our Mission, Vision and{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Values</span>
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
                className={`text-center transition-all duration-300 hover:transform hover:scale-105 ${
                  index === 1 ? 'lg:scale-105' : ''
                }`}
              >
                <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-12 w-12 text-amber-700 font-light" stroke-width="1" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-justify">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              Join Our Mission
            </h3>
            <p className="text-lg text-gray-600 mb-6 font-light">
              Together, we can create lasting change and build stronger, more resilient communities. 
              Your support makes a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors duration-300 font-medium">
                Get Involved
              </button>
              <button className="px-6 py-3 border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}