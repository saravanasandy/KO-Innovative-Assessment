import React, { useState } from "react";
import { Layout, Row, Col, Card, Input, Checkbox, Slider, Button, Drawer } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Select, Avatar } from "antd";
import { AiFillStar } from "react-icons/ai";
import { Typography } from "antd";
import "antd/dist/reset.css"; 
import productData from "./ProductData";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const brandsData = [
  { name: "Nike", logo: "https://cdn-icons-png.flaticon.com/128/732/732229.png" },
  { name: "Adidas", logo: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/acd8579f-41a0-4677-8c30-4fff1fbe3c3e._CR0%2C0%2C400%2C400_SX100_.jpg" },
  { name: "Apple", logo: "https://cdn-icons-png.flaticon.com/128/732/732217.png" },
  { name: "Puma", logo: "https://m.media-amazon.com/images/X/bcsT/M/mbcsThKmJNXzsQt._RO299.0,1,0,0,0,0,0,0,0,0,15_FMpng_CR0,0,0,0_SS112_.jpg" },
  { name: "Vans", logo: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/cd85e38f-4076-4819-b7c8-a7c3972bd7cb._CR0,0,804,803_AC_SX130_SY60_QL70_.jpg" },
];

const ProductFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [products] = useState(productData);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const brands = [...new Set(products.map((item) => item.company))];
  const colors = [...new Set(products.map((item) => item.color))];
  const sizes = [...new Set(products.flatMap((item) => item.size))];

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = productData.filter((item) => {
    return (
      (selectedBrands.length === 0 || selectedBrands.includes(item.company)) &&
      (selectedColors.length === 0 || selectedColors.includes(item.color)) &&
      (selectedSizes.length === 0 || item.size.some((size) => selectedSizes.includes(size))) &&
      parseInt(item.newPrice) >= priceRange[0] &&
      parseInt(item.newPrice) <= priceRange[1]
    );
  });

  const renderFilters = () => (
    <div style={{ padding: "20px" }}>
      <h2 >Filters</h2>
      <div style={{ marginBottom: "20px" }}>
        <h4>Brand</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {brandsData.filter((b) => brands.includes(b.name)).map((brand) => (
            <div key={brand.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Checkbox checked={selectedBrands.includes(brand.name)} onChange={() => handleBrandChange(brand.name)} />
              <img src={brand.logo} alt={brand.name} style={{ width: "20px", height: "20px", objectFit: "contain" }} />
              <span style={{ fontSize: "16px" }}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Price</h4>
        <Slider range min={50} max={200} defaultValue={[50, 200]} onChange={(value) => setPriceRange(value)} />
        <p>${priceRange[0]} - ${priceRange[1]}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Color</h4>
        {colors.map((color) => (
          <Checkbox key={color} checked={selectedColors.includes(color)} onChange={(e) => {
            setSelectedColors(e.target.checked ? [...selectedColors, color] : selectedColors.filter((c) => c !== color));
          }}>
            {color}
          </Checkbox>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Size</h4>
        {sizes.map((size) => (
          <Checkbox key={size} checked={selectedSizes.includes(size)} onChange={(e) => {
            setSelectedSizes(e.target.checked ? [...selectedSizes, size] : selectedSizes.filter((s) => s !== size));
          }}>
            {size}
          </Checkbox>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between",boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} style={{ display: "none", marginRight: "10px" }} id="mobile-menu-btn" />
       
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
            src="https://your-logo-url.com/logo.png"
            alt="Logo"
            style={{ height: "40px", cursor: "pointer" }}
            />
        </div>

       
        <Input
            placeholder="What are you looking for?"
            prefix={<SearchOutlined />}
            style={{
            width: "40%",
            height: "40px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            padding: "5px 15px",
            }}
        />

            
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
               
                <Button icon={<HeartOutlined />} type="text" style={{ fontSize: "18px" }} />

                <Button icon={<ShoppingCartOutlined />} type="text" style={{ fontSize: "18px" }} />

                {/* Language Selector */}
                <Select defaultValue="English" style={{ width: 100 }}>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="tam">Tamil</Select.Option>
                <Select.Option value="tel">Telugu</Select.Option>
                <Select.Option value="mal">Malayalam</Select.Option>
                </Select>

               
                <Text className="welcome-text">Welcome, Bhuvanesh</Text>
                <Avatar size="large" src="https://your-profile-pic-url.com/avatar.png" />
            </div>    
             
      </Header>

      <Layout>
        <Sider
          width={240}
          style={{ background: "#fff", padding: "20px" }}
          breakpoint="lg"
          collapsedWidth="0"
          id="desktop-sidebar"
        >
          {renderFilters()}
        </Sider>

        <Drawer
          title="Filters"
          placement="left"
          closable
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          id="mobile-drawer"
        >
          {renderFilters()}
        </Drawer>

        <Content style={{ padding: "20px" }}>
               {/* Banner Image */}
                <div style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
                    <img
                        src="https://t3.ftcdn.net/jpg/03/20/68/66/360_F_320686681_Ur6vdYQgDC9WiijiVfxlRyQffxOgfeFz.jpg"
                        alt="Simple is More"
                        style={{ width: "100%", maxHeight: "250px", objectFit: "cover" }}
                    />
                </div>

          <Row gutter={[16, 16]}>
            {filteredProducts.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card hoverable={true} cover={<img alt={item.title} src={item.img} style={{ height: "270px", objectFit: "contain",marginTop:"20px"}} />}>
                  <h3 style={{ fontSize: "16px" }}>{item.title}</h3>
                  <p><AiFillStar style={{ color: "gold" }} /> {item.reviews}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <p style={{ textDecoration: "line-through", color: "gray", margin: 0 }}>
                            {item.prevPrice}
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "16px", color: "black", margin: 0 }}>
                            ${item.newPrice}
                        </p>
                    </div>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size.join(", ")}</p>
                </Card>
              </Col>
            ))}
          </Row>
          {filteredProducts.length === 0 && <p style={{ textAlign: "center", marginTop: "20px" }}>No products found</p>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductFilter;
