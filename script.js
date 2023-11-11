function error(errorInput, Input, Span, errorMsg) {
    errorInput.innerHTML = errorMsg;
    errorInput.classList.add("error");
    Input.classList.add("input-error");
    Span.classList.add("light-red");
  }
  
  function validateDateValue(value, minValue, maxValue, errorMessage) {
    return value >= minValue && value <= maxValue ? null : errorMessage;
  }
  
  function validation_day(day, month, year, errorDay, daySpan) {
    const maxDays = (month.value == 2 && ((0 == year.value % 4 && 0 != year.value % 100) || 0 == year.value % 400)) ? 29 : (month.value == 2 ? 28 : (month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11) ? 30 : 31);
  
    const errorMessage = validateDateValue(day.value, 1, maxDays, "Must be a valid day");
    if (errorMessage) {
      error(errorDay, day, daySpan, errorMessage);
    }
  }
  
  function validation_month(errorMonth, month, monthSpan) {
    const errorMessage = validateDateValue(month.value, 1, 12, "Must be a valid month");
    if (errorMessage) {
      error(errorMonth, month, monthSpan, errorMessage);
    }
  }
  
  function validation_year(errorYear, year, yearSpan) {
    const errorMessage = validateDateValue(year.value, 1920, 2023, "Must be in the past");
    if (errorMessage) {
      error(errorYear, year, yearSpan, errorMessage);
    }
  }
  
  function calculate_age() {
    const day = document.querySelector(".day-input input");
    const month = document.querySelector(".month-input input");
    const year = document.querySelector(".year-input input");
    const errorDay = document.querySelector(".day-error");
    const errorMonth = document.querySelector(".month-error");
    const errorYear = document.querySelector(".year-error");
    const daySpan = document.querySelector(".day-input span");
    const monthSpan = document.querySelector(".month-input span");
    const yearSpan = document.querySelector(".year-input span");
  
    errorDay.innerHTML = "";
    errorMonth.innerHTML = "";
    errorYear.innerHTML = "";
  
    day.classList.remove("input-error");
    month.classList.remove("input-error");
    year.classList.remove("input-error");
    daySpan.classList.remove("light-red");
    monthSpan.classList.remove("light-red");
    yearSpan.classList.remove("light-red");
  
    const hasDay = day.value.trim() !== "";
    const hasMonth = month.value.trim() !== "";
    const hasYear = year.value.trim() !== "";
  
    if (hasDay && hasMonth && hasYear) {
      validation_day(day, month, year, errorDay, daySpan);
      validation_month(errorMonth, month, monthSpan);
      validation_year(errorYear, year, yearSpan);
  
      const selectedDate = new Date(year.value, month.value - 1, day.value);
      const currentTimestamp = Date.now();
      const timeDifference = currentTimestamp - selectedDate;
      const yourAge = new Date(timeDifference);
      const yearsDifference = yourAge.getUTCFullYear() - 1970;
      const monthsDifference = yourAge.getUTCMonth();
      const daysDifference = yourAge.getUTCDate() - 1;
  
      document.querySelector(".output-year").innerHTML = yearsDifference;
      document.querySelector(".output-month").innerHTML = monthsDifference;
      document.querySelector(".output-day").innerHTML = daysDifference;
    } else {
      !hasDay && error(errorDay, day, daySpan, "This field is required");
      !hasMonth && error(errorMonth, month, monthSpan, "This field is required");
      !hasYear && error(errorYear, year, yearSpan, "This field is required");
    }
  }
  