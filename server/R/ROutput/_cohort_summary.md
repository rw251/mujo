Load compliance
================================================================================

Date: 2016-06-08 13:54:03

This is a test report on load compliance using simulated data.  
The report changes with selected cohort. Interactive graphs could be added as a separate functionality.  

## Probability of compliance  
The following table shows 5 combinations of age, weight and diagnosis whith the lowest probabilities of compliance.  
The compliance probabilities are estimated using mixed effects models with diagnosis as random effects.  
The result would be that the combination of age, weight and diagnosis in the first row is most likely to lead to non-compliance.  
If there is not enough data you will see some error messages below.  
<br>
<center>
*Top 5 combinations with lowest probability of compliance.*

```
## fixed-effect model matrix is rank deficient so dropping 2 columns / coefficients
```

```
## Error: Response is constant
```
</center>
<br>
<br>

## Some basic data summary  
Basic counts: 
<center>
<!-- html table generated in R 3.2.3 by xtable 1.8-2 package -->
<!-- Wed Jun 08 13:54:03 2016 -->
<table cellspacing="5" cellpadding="10" border="1">
  <tr> <td align="center"> Number of patients </td> <td align="center">   3 </td> </tr>
  <tr> <td align="center"> Number of diagnosis </td> <td align="center">   3 </td> </tr>
  <tr> <td align="center"> Number of occupations </td> <td align="center">   3 </td> </tr>
   </table>
</center>  
<br>
<br>

Load compliance by age, weight and gender. Both age and weight are devided into five equal groups.  
The confidence bars represent 95% binomial confidence intervals.  
<br>
<br>
<center>
*Compliance by age, weight and gender.*  


![plot of chunk ../../../public/comp-plot-](figure/../../../public/comp-plot--1.png)  
</center>  



## Compliance percentage by diagnosis
<br>
<center>
*Compliance by diagnosis.*  
<!-- html table generated in R 3.2.3 by xtable 1.8-2 package -->
<!-- Wed Jun 08 13:54:04 2016 -->
<table cellspacing="5" cellpadding="10" border="1">
<tr> <th> Diagnosis </th> <th> Load </th> <th> Load Compliance </th> <th> % </th>  </tr>
  <tr> <td align="center"> 21000 </td> <td align="center"> 21000.00 </td> <td align="center"> 21000.00 </td> <td align="center"> 100.00 </td> </tr>
  <tr> <td align="center"> 23400 </td> <td align="center"> 23400.00 </td> <td align="center"> 23400.00 </td> <td align="center"> 100.00 </td> </tr>
  <tr> <td align="center"> 26800 </td> <td align="center"> 26800.00 </td> <td align="center"> 26800.00 </td> <td align="center"> 100.00 </td> </tr>
   </table>
</center>    
<br>  
<br>


