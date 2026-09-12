import { Col, Container, Row } from 'react-bootstrap';
import Service1 from '../../../assets/services/image 104.png';
import Service2 from '../../../assets/services/image 106.png';
import Service3 from '../../../assets/services/image 107.png';
import Service4 from '../../../assets/services/image 108.png';

import { BsSearch, BsBoxSeam, BsSend, BsShieldCheck } from 'react-icons/bs';

const ServiceSection = () => {
  const extraServices = [
    {
      id: 1,
      title: "Source from Industry Hubs",
      image: Service1,
      icon: BsSearch,
    },
    {
      id: 2,
      title: "Customize Your Products",
      image: Service2,
      icon: BsBoxSeam,
    },
    {
      id: 3,
      title: "Fast, reliable shipping by ocean or air",
      image: Service3,
      icon: BsSend,
    },
    {
      id: 4,
      title: "Product monitoring and inspection",
      image: Service4,
      icon: BsShieldCheck,
    },
  ];

  return (
    <Container className="p-2 p-md-3 my-4">
      <h5 className="fw-bold mb-3 text-dark">Our extra services</h5>
      <Row className="g-3">
        {extraServices.map((item) => {
          const IconComponent = item.icon;
          return (
            <Col xs={12} sm={6} lg={3} key={item.id}>
              <div className="bg-white border rounded-3 overflow-hidden h-100 d-flex flex-column">
                
                {/* Image Container with Floating Icon Badge */}
                <div className="position-relative w-100" style={{ height: "120px" }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-100 h-100 object-fit-cover"
                  />
                  {/* Floating Action Circle */}
                  <div 
                    className="position-absolute bg-primary-subtle border border-2 border-white rounded-circle d-flex align-items-center justify-content-center text-dark shadow-sm"
                    style={{ 
                      width: "48px", 
                      height: "48px", 
                      bottom: "-24px", 
                      right: "20px",
                      zIndex: 2 
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Card Title Content */}
                <div className="p-3 pt-4 flex-grow-1 bg-white">
                  <p className="fw-medium text-dark mb-0 pe-4 style-title" style={{ fontSize: "14px", lineHeight: "1.3" }}>
                    {item.title}
                  </p>
                </div>

              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ServiceSection;