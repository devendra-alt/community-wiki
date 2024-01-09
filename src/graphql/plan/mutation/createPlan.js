import { gql } from '@apollo/client';

export const CREATE_PLAN=gql`
    mutation createPlan($planName:String,$amount:Long,$description:String,$startDate:Date,$endDate:Date){
        createPlan(data:{
            plan_name:$planName
            amount:$amount
            description:$description
            start:$startDate
            end:$endDate
        }){
            data{
                id
            }
        }
    }

`