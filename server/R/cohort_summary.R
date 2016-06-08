
## parse arguments
args.cmd <- commandArgs(trailingOnly = TRUE)
args.cmd <- args.cmd[args.cmd != "--args"]
ParseArgs <- function(x) strsplit(x, "=")
args.df <- as.data.frame(do.call("rbind", ParseArgs(args.cmd)))
args <- as.list(as.character(args.df$V2))
names(args) <- args.df$V1

#print(args)

## sink files: comment these to see the output on calling webpage
file.out <- file(paste0("ROutput/", args$filePrefix, ".out"), open = "wt")
file.err <- file(paste0("ROutput/", args$filePrefix, ".err"), open = "wt")
sink(file.out, type = "output")
sink(file.err, type = "message")

## add additional libraries path if needed
.libPaths()
.libPaths(c(.libPaths(), "C:/Users/Artur/Documents/R/win-library/3.2"))

list.of.packages <- c("ggplot2", "knitr", "plyr", "lme4", "reshape2", "Hmisc", "xtable")
list.of.packages
new.packages <- list.of.packages[!(list.of.packages %in% installed.packages()[,"Package"])]
new.packages
if(length(new.packages)) install.packages(new.packages, repos="https://www.stats.bris.ac.uk/R/")

## load needed libraries
#library(RMySQL)
library(knitr)
library(ggplot2)
library(plyr)
library(lme4)
library(reshape2)
library(Hmisc)
library(xtable)

## connected to MySQL server
###mujo <- dbConnect(MySQL(), user='root', password='', dbname='mujo', host='localhost')

## create temp table for calculating age at the start of prescribed exercise
###dbSendQuery(mujo, "create temporary table age as
###            (select b.id, datediff(startDate, dateOfbirth)/365.25 as age from patient_info as a
###            inner join prescription as b on a.userId = b.id)")

## sql command header for getting the data
###sql <- "select a.userId, a.gender, a.dateOfBirth, a.diagnosis, a.occupation, a.weight, b.age, c.load, c.loadCompliance
        ###from patient_info as a
        ###join age as b on a.userId = b.id
        ###inner join result_exercise as c on a.userId = c.id"

## where bit for SQL if needed, if -1 then no where condition
###w <- NULL
###if(args$gender != "-1"){
###  w <- c(w, paste0("gender in (", args$gender, ")"))
###}
###if(args$ageMin != "0" & args$ageMax != "200"){
  ###w <- c(w, paste0("age >= ", args$ageMin, " and age <= ", args$ageMax))
###}
###if(args$weightMin != "0" & args$weightMax != "500"){
  ###w <- c(w, paste0("weight >= ", args$weightMin, " and weight <= ", args$weightMax))
###}
###if(args$dob != "-1"){
  ###w <- c(w, paste0("dateOfBirth >= '", substring(args$dob, 1, 11), "'"))
###}
###if(args$diagnosis != "-1"){
  ###w <- c(w, paste0("diagnosis in (select name from diagnosis where id in (", args$diagnosis, "))"))
###}
###if(args$occupation != "-1"){
  ###w <- c(w, paste0("occupation in (select name from occupation where id in (", args$occupation, "))"))
###}
## add where if not null
###if(!is.null(w)){
  ###sql <- paste(sql, "where", paste(w, collapse = " and "))
###}
userId <- c('1','2','3')
gender <- c('M', 'F', 'M')
dateOfBirth <- as.Date(c('2010-11-1','2008-3-25','2007-3-1'))
diagnosis <- c(21000, 23400, 26800)
occupation <- c(21000, 23400, 26800)
weight <- c(21000, 23400, 26800)
age <- c(21000, 23400, 26800)
load <- c(21000, 23400, 26800)
loadCompliance <- c(21000, 23400, 26800)
d <-data.frame(userId, gender, dateOfBirth, diagnosis, occupation, weight, age, load, loadCompliance)
## get the data
###d <- dbGetQuery(mujo, sql)
## further analysis assumes one row per patient
stopifnot(length(unique(d$userId)) == nrow(d))
## add some new columns
d$AgeBand <- cut(d$age, 5)
d$WeightBand <- cut(d$weight, 5)
d$gender <- as.factor(d$gender)
d$diagnosis <- as.factor(d$diagnosis)

## group by age, weight and gender
b <- ddply(d, .(AgeBand, WeightBand, gender), function(x){
  data.frame(gLoad = sum(x$load, na.rm = TRUE),
             gLoadCompliance = sum(x$loadCompliance, na.rm = TRUE))
})
## binomial confidence intervals
b <- merge(b,
           ddply(b, .(AgeBand, WeightBand, gender), function(x){
             bcf <- binconf(x$gLoadCompliance[1], x$gLoad[1]) * 100
             data.frame(loadPerc = bcf[1, "PointEst"],
                        loadPercLower = bcf[1, "Lower"],
                        loadPercUpper = bcf[1, "Upper"])
           }), by = c("AgeBand", "WeightBand", "gender"))

## annotate weight labels
weight.levs <- levels(d$WeightBand)
weight.labels <- gsub(",", ", ", weight.levs)
weight.labels <- paste0("Weight: ", weight.labels, " kg")
b$WeightBand <- factor(b$WeightBand, levels = weight.levs, labels = weight.labels)

## remove previous results if exist
file.html <- paste0("ROutput/", args$filePrefix, "_cohort_summary.html")
file.md <- paste0("ROutput/", args$filePrefix, "_cohort_summary.md")
if(file.exists(file.html)){
  unlink(file.html)
}
if(file.exists(file.md)){
  unlink(file.md)
}

## compile report from *.Rmd file
knit("cohort_summary.Rmd", quiet = TRUE, output = file.md)

system(paste0("../../node_modules/.bin/pandoc -s ", file.md, " -o ", file.html), intern = TRUE)

## disconnect the server
###dbDisconnect(mujo)

## close sinks
sink(type = "message")
sink(type = "output")
