import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Input,
  Checkbox,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";

import { Product } from "@backend/domains/products/types";
import { useGetProducts } from "./api/hooks/useGetProducts";
import { useCreatePayment } from "./api/hooks/useCreatePayment";

const PricingContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  margin: "0 auto",
  width: "100vw",


}));

const PlanPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
}));

const PlanTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PlanPrice = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));


const PlanHighlight = styled(Typography)(({ theme }) => ({
  border: "1px solid",
  boorderColor: "rgb(30, 136, 229)",
  borderRadius: theme.spacing(1),
  fontWeight: "bold",
  color: "rgb(0, 134, 255)",
  backgroundColor: "rgba(0, 134, 255, 0.07)",
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalSuspense = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  maxWidth: "none",
  padding: 0,
}));



const ModalContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  // alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "50%",
  maxHeight: "80%",

  backgroundColor: "#fff",
  zIndex: 101,
  borderRadius: theme.spacing(1),
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  
}));



function App() {
  const [quantity, setQuantity] = React.useState(1);
  const { isPending, data: products } = useGetProducts();
  const { mutate } = useCreatePayment();

  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(
    {
      title: "Color",
      monthly: {
        price: 14.99,
        billingPeriod: "monthly"
      },

      yearly: {
        price: 89.99,
        billingPeriod: "annually"
      },

      teams: {
        priceUnit: 89.99,
        price: 89.99,
        billingPeriod: "annually"
      },

      selected: "monthly"
      
    }
  );

  const handleOnBuyMonthlyClick = (product: Product) => {
    mutate({ quantity: 1, billingPeriod: product.billingPeriod });
  };

  const handleOnBuyYearlyClick = (product: Product) => {
    mutate({ quantity: 1, billingPeriod: product.billingPeriod });
  };

  const handleOnBuyTeamsClick = (product: Product) => {
    mutate({ quantity, billingPeriod: product.billingPeriod });
  };

  if (isPending) return "Loading...";

  const colorMonthlyProduct = products.colorMonthly;
  const colorYearlyProduct = products.colorYearly;
  const colorTeamsProduct = products.colorTeams;

  const insiderMonthlyProduct = products.insiderMonthly;
  const insiderYearlyProduct = products.insiderYearly;
  const insiderTeamsProduct = products.insiderTeams;

  const insiderYearlySave = 100 - Number((insiderYearlyProduct.price / (insiderMonthlyProduct.price*12) * 100).toFixed(0))
  const colorYearlySave = 100 - Number((colorYearlyProduct.price / (colorMonthlyProduct.price*12) * 100).toFixed(0))


  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setQuantity(Number(e.target.value));

    if (Number(e.target.value) < 1) {
      setQuantity(1);
      return;
    } else if (Number(e.target.value) > 100) {
      setQuantity(100);
      return;
    }

    if (Number(e.target.value) > 1) {
      setQuantity(Number(e.target.value));

      // change prices to use the Team prices
      setModalData({
        ...modalData,
        selected: "teams",
        teams: {
          ...modalData.teams,
          price: Number((Number(modalData.teams.priceUnit) * Number(e.target.value)).toFixed(2))
        }
      })

      return;

    }

    setQuantity(Number(e.target.value));
    setModalData({
      ...modalData,
      selected: "monthly",
      teams: {
        ...modalData.teams,
        price: modalData.teams.priceUnit
      }
    })



  }


  return (

    <>
    
    {
        openModal && 
        <>
          <ModalSuspense onClick={() =>{ setOpenModal(false); setQuantity(1)}}/>

          <ModalContainer>
            <div style={{
              display: "flex",
              flexDirection:"column",
              // justifyContent: "center",
              alignItems: "start",
              width:"40%",
              height: "100%",

            }}>
              <Typography variant="h3" align="center" gutterBottom>
                {modalData.title}
              </Typography>

              <Typography variant="h6" align="center" color="textSecondary" paragraph>

                {modalData.selected === "monthly" ? 
                  `${modalData.monthly.price}€ / ${modalData.monthly.billingPeriod}` : 
                  modalData.selected === "yearly" ?
                  `${modalData.yearly.price}€ / ${modalData.yearly.billingPeriod}` :
                  modalData.selected === "teams" ?
                  `${modalData.teams.price}€ / ${modalData.teams.billingPeriod}` :
                  ""
                }

              </Typography>
            </div>

            <div style={{
              display: "flex", 
              flexDirection:"column", 
              // justifyContent: "center", 
              // alignItems: "center", 
              width:"60%",
              height: "100%",
              gap: "20px",

            }}>
              <Typography variant="h5"  color="textSecondary" paragraph>
                Billing cycle:
              </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="monthly"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setModalData({
                      ...modalData,
                      selected: e.target.value
                    })
                    setQuantity(1);
                  }}
                  value={modalData.selected}
                  row
                  >
                  <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                  <FormControlLabel value={[ "yearly", "teams" ].includes(modalData.selected) ? modalData.selected : "yearly"} control={<Radio />} label="Yearly" />
                </RadioGroup>


                <div style={{width: "100%", height: "1px", }}></div>

                <div style={{display: "flex", alignItems: "center", gap:"10px"}}>
                  <Typography variant="h5"  color="textSecondary" paragraph>
                    Quantity:
                  </Typography>

                  <Input
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    value={quantity}
                    onChange={changeQuantity}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {

                  }}

                >

                  Purchase
                </Button>



                
              
              </div>  





            
          </ModalContainer>
        </>
      }


    <PricingContainer>
      <Typography variant="h3" align="center" gutterBottom>
        Pricing Plans
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Choose the plan that suits you best.
      </Typography>



      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Insider</PlanTitle>
            <PlanHighlight >
              save {insiderYearlySave}%
            </PlanHighlight>
            <PlanPrice variant="h6">
              {insiderYearlyProduct.price}€ / {insiderYearlyProduct.billingPeriod} (per seat)
            </PlanPrice>
            <PlanPrice>
              or {insiderMonthlyProduct.price}€ / {insiderMonthlyProduct.billingPeriod} ({insiderMonthlyProduct.price*12}€ / year)
            </PlanPrice>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>{
                setModalData({
                  title: "Insider",
                  monthly: {
                    price: insiderMonthlyProduct.price,
                    billingPeriod: "monthly"
                  },
                  yearly: {
                    price: insiderYearlyProduct.price,
                    billingPeriod: "annually"
                  },
                  teams: {
                    priceUnit: insiderTeamsProduct.price,
                    price: insiderTeamsProduct.price,
                    billingPeriod: "annually"
                  },
                  selected: "monthly"
                })
                setOpenModal(true);
              }}
            >
              Select
            </Button>
          </PlanPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Insider + Color</PlanTitle>
            <PlanHighlight >
              save up to 20% *
            </PlanHighlight>
            <PlanPrice variant="h6">
              {((colorYearlyProduct.price + insiderYearlyProduct.price) * 0.9).toFixed(2)}€ / {colorYearlyProduct.billingPeriod}
            </PlanPrice>
            <PlanPrice >
              or {((colorTeamsProduct.price + insiderTeamsProduct.price) * 0.8).toFixed(2)}€ / {colorTeamsProduct.billingPeriod} (per seat)
            </PlanPrice>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>{

                let monthlyPrice = Number((Number(colorMonthlyProduct.price + insiderMonthlyProduct.price) * 0.9).toFixed(2))
                let yearlyPrice = Number((Number(colorYearlyProduct.price + insiderYearlyProduct.price) * 0.9).toFixed(2))
                let teamsPrice = Number((Number(colorTeamsProduct.price + insiderTeamsProduct.price) * 0.8).toFixed(2))
 
                setModalData({
                  title: "Insider + Color",
                  monthly: {
                    price: monthlyPrice,
                    billingPeriod: "monthly"
                  },
                  yearly: {
                    price: yearlyPrice,
                    billingPeriod: "annually"
                  },
                  teams: {
                    priceUnit: teamsPrice,
                    price: teamsPrice,
                    billingPeriod: "annually"
                  },
                  selected: "monthly"
                })
                setOpenModal(true);
              }}
            >
              Select
            </Button>
          </PlanPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Color</PlanTitle>
            <PlanHighlight >
              save {colorYearlySave}%
            </PlanHighlight>
            <PlanPrice variant="h6">
              {colorYearlyProduct.price}€ / {colorYearlyProduct.billingPeriod} (per seat)
            </PlanPrice>
            <PlanPrice>
              or {colorMonthlyProduct.price}€ / {colorMonthlyProduct.billingPeriod} ({colorMonthlyProduct.price*12}€ / year)
            </PlanPrice>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalData({
                  title: "Color",
                  monthly: {
                    price: colorMonthlyProduct.price,
                    billingPeriod: "monthly"
                  },
                  yearly: {
                    price: colorYearlyProduct.price,
                    billingPeriod: "annually"
                  },
                  teams: {
                    priceUnit: colorTeamsProduct.price,
                    price: colorTeamsProduct.price,
                    billingPeriod: "annually"
                  },
                  selected: "monthly"
                })
                setOpenModal(true);
              }}
            >
              Select
            </Button>
          </PlanPaper>
        </Grid>
      </Grid>


      
{/* 
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Color Monthly</PlanTitle>
            <PlanPrice variant="h4">
              {monthlyProduct.price}€ / {monthlyProduct.billingPeriod}
            </PlanPrice>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOnBuyMonthlyClick(monthlyProduct)}
            >
              Buy
            </Button>
          </PlanPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Color Yearly</PlanTitle>
            <PlanPrice variant="h4">
              {yearlyProduct.price}€ / {yearlyProduct.billingPeriod}
            </PlanPrice>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOnBuyYearlyClick(yearlyProduct)}
            >
              Buy
            </Button>
          </PlanPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PlanPaper elevation={3}>
            <PlanTitle variant="h5">Color Teams</PlanTitle>
            <PlanPrice variant="h4">
              {teamsProduct.price}€ / {teamsProduct.billingPeriod}
            </PlanPrice>
            <Input
              type="number"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOnBuyTeamsClick(teamsProduct)}
            >
              Buy
            </Button>
          </PlanPaper>
        </Grid>
      </Grid>

 */}

    </PricingContainer>
    </>
  );
}

export default App;
