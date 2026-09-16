import UAE from '../../../assets/flags/AE@2x.png';
import AUS from '../../../assets/flags/AU@2x.png';
import USA from '../../../assets/flags/icon.png';
import RUS from '../../../assets/flags/RU@2x.png';
import ITA from '../../../assets/flags/IT@2x.png';
import CH from '../../../assets/flags/CN@2x.png';
import DEN from '../../../assets/flags/DK@2x.png';
import FS from '../../../assets/flags/FR@2x.png';
import UK from '../../../assets/flags/GB@2x.png';
import { Container, Row } from 'react-bootstrap';


const RegionSection = () => {
    const countries = [
        { image: AUS, name: 'Australia', email: 'shopname.ae' },
        { image: UAE, name: 'Arabic Emirates', email: 'shopname.ae' },
        { image: USA, name: 'United State', email: 'shopname.ae' },
        { image: RUS, name: 'Russia', email: 'shopname.ru' },
        { image: ITA, name: 'Italia', email: 'shopname.it' },
        { image: CH, name: 'China', email: 'shopname.ch' },
        { image: DEN, name: 'Denmark', email: 'shopname.dk' },
        { image: FS, name: 'France', email: 'shopname.fs' },
        { image: UK, name: 'United Kingdom', email: 'shopname.uk' },
        { image: UAE, name: 'Arabic Emirates', email: 'shopname.ae' },
        { image: UAE, name: 'Arabic Emirates', email: 'shopname.ae' },
        { image: UAE, name: 'Arabic Emirates', email: 'shopname.ae' }
    ]
    return (
        <>
            <Container>
                <p className="fw-bold">Suppliers by region</p>
                <Row className="align-items-center gap-1">
                    {
                        countries.map((item) => (
                            <div className="d-flex align-items-center gap-1 city-item" key={item.name}>
                                    <div>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="line-height">
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                    </div>
                            </div>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default RegionSection
