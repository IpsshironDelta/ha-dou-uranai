import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">年を選択</InputLabel>
        <Select
          id        = {props.id}
          value     = {props.value}
          label     = {props.label}
          onChange  = {props.onChange}>
            <MenuItem value="1913">1913年(大正2年)</MenuItem>
            <MenuItem value="1914">1914年(大正3年)</MenuItem>
            <MenuItem value="1915">1915年(大正4年)</MenuItem>
            <MenuItem value="1916">1916年(大正5年)</MenuItem>
            <MenuItem value="1917">1917年(大正6年)</MenuItem>
            <MenuItem value="1918">1918年(大正7年)</MenuItem>
            <MenuItem value="1919">1919年(大正8年)</MenuItem>
            <MenuItem value="1920">1920年(大正9年)</MenuItem>
            <MenuItem value="1921">1921年(大正10年)</MenuItem>
            <MenuItem value="1922">1922年(大正11年)</MenuItem>
            <MenuItem value="1923">1923年(大正12年)</MenuItem>
            <MenuItem value="1924">1924年(大正13年)</MenuItem>
            <MenuItem value="1925">1925年(大正14年)</MenuItem>
            <MenuItem value="1926">1926年(大正15年)</MenuItem>
            <MenuItem value="1927">1927年(昭和2年)</MenuItem>
            <MenuItem value="1928">1928年(昭和3年)</MenuItem>
            <MenuItem value="1929">1929年(昭和4年)</MenuItem>
            <MenuItem value="1930">1930年(昭和5年)</MenuItem>
            <MenuItem value="1931">1931年(昭和6年)</MenuItem>
            <MenuItem value="1932">1932年(昭和7年)</MenuItem>
            <MenuItem value="1933">1933年(昭和8年)</MenuItem>
            <MenuItem value="1934">1934年(昭和9年)</MenuItem>
            <MenuItem value="1935">1935年(昭和10年)</MenuItem>
            <MenuItem value="1936">1936年(昭和11年)</MenuItem>
            <MenuItem value="1937">1937年(昭和12年)</MenuItem>
            <MenuItem value="1938">1938年(昭和13年)</MenuItem>
            <MenuItem value="1939">1939年(昭和14年)</MenuItem>
            <MenuItem value="1940">1940年(昭和15年)</MenuItem>
            <MenuItem value="1941">1941年(昭和16年)</MenuItem>
            <MenuItem value="1942">1942年(昭和17年)</MenuItem>
            <MenuItem value="1943">1943年(昭和18年)</MenuItem>
            <MenuItem value="1944">1944年(昭和19年)</MenuItem>
            <MenuItem value="1945">1945年(昭和20年)</MenuItem>
            <MenuItem value="1946">1946年(昭和21年)</MenuItem>
            <MenuItem value="1947">1947年(昭和22年)</MenuItem>
            <MenuItem value="1948">1948年(昭和23年)</MenuItem>
            <MenuItem value="1949">1949年(昭和24年)</MenuItem>
            <MenuItem value="1950">1950年(昭和25年)</MenuItem>
            <MenuItem value="1951">1951年(昭和26年)</MenuItem>
            <MenuItem value="1952">1952年(昭和27年)</MenuItem>
            <MenuItem value="1953">1953年(昭和28年)</MenuItem>
            <MenuItem value="1954">1954年(昭和29年)</MenuItem>
            <MenuItem value="1955">1955年(昭和30年)</MenuItem>
            <MenuItem value="1956">1956年(昭和31年)</MenuItem>
            <MenuItem value="1957">1957年(昭和32年)</MenuItem>
            <MenuItem value="1958">1958年(昭和33年)</MenuItem>
            <MenuItem value="1959">1959年(昭和34年)</MenuItem>
            <MenuItem value="1960">1960年(昭和35年)</MenuItem>
            <MenuItem value="1961">1961年(昭和36年)</MenuItem>
            <MenuItem value="1962">1962年(昭和37年)</MenuItem>
            <MenuItem value="1963">1963年(昭和38年)</MenuItem>
            <MenuItem value="1964">1964年(昭和39年)</MenuItem>
            <MenuItem value="1965">1965年(昭和40年)</MenuItem>
            <MenuItem value="1966">1966年(昭和41年)</MenuItem>
            <MenuItem value="1967">1967年(昭和42年)</MenuItem>
            <MenuItem value="1968">1968年(昭和43年)</MenuItem>
            <MenuItem value="1969">1969年(昭和44年)</MenuItem>
            <MenuItem value="1970">1970年(昭和45年)</MenuItem>
            <MenuItem value="1971">1971年(昭和46年)</MenuItem>
            <MenuItem value="1972">1972年(昭和47年)</MenuItem>
            <MenuItem value="1973">1973年(昭和48年)</MenuItem>
            <MenuItem value="1974">1974年(昭和49年)</MenuItem>
            <MenuItem value="1975">1975年(昭和50年)</MenuItem>
            <MenuItem value="1976">1976年(昭和51年)</MenuItem>
            <MenuItem value="1977">1977年(昭和52年)</MenuItem>
            <MenuItem value="1978">1978年(昭和53年)</MenuItem>
            <MenuItem value="1979">1979年(昭和54年)</MenuItem>
            <MenuItem value="1980">1980年(昭和55年)</MenuItem>
            <MenuItem value="1981">1981年(昭和56年)</MenuItem>
            <MenuItem value="1982">1982年(昭和57年)</MenuItem>
            <MenuItem value="1983">1983年(昭和58年)</MenuItem>
            <MenuItem value="1984">1984年(昭和59年)</MenuItem>
            <MenuItem value="1985">1985年(昭和60年)</MenuItem>
            <MenuItem value="1986">1986年(昭和61年)</MenuItem>
            <MenuItem value="1987">1987年(昭和62年)</MenuItem>
            <MenuItem value="1988">1988年(昭和63年)</MenuItem>
            <MenuItem value="1989">1989年(平成元年)</MenuItem>
            <MenuItem value="1990">1990年(平成2年)</MenuItem>
            <MenuItem value="1991">1991年(平成3年)</MenuItem>
            <MenuItem value="1992">1992年(平成4年)</MenuItem>
            <MenuItem value="1993">1993年(平成5年)</MenuItem>
            <MenuItem value="1994">1994年(平成6年)</MenuItem>
            <MenuItem value="1995">1995年(平成7年)</MenuItem>
            <MenuItem value="1996">1996年(平成8年)</MenuItem>
            <MenuItem value="1997">1997年(平成9年)</MenuItem>
            <MenuItem value="1998">1998年(平成10年)</MenuItem>
            <MenuItem value="1999">1999年(平成11年)</MenuItem>
            <MenuItem value="2000">2000年(平成12年)</MenuItem>
            <MenuItem value="2001">2001年(平成13年)</MenuItem>
            <MenuItem value="2002">2002年(平成14年)</MenuItem>
            <MenuItem value="2003">2003年(平成15年)</MenuItem>
            <MenuItem value="2004">2004年(平成16年)</MenuItem>
            <MenuItem value="2005">2005年(平成17年)</MenuItem>
            <MenuItem value="2006">2006年(平成18年)</MenuItem>
            <MenuItem value="2007">2007年(平成19年)</MenuItem>
            <MenuItem value="2008">2008年(平成20年)</MenuItem>
            <MenuItem value="2009">2009年(平成21年)</MenuItem>
            <MenuItem value="2010">2010年(平成22年)</MenuItem>
            <MenuItem value="2011">2011年(平成23年)</MenuItem>
            <MenuItem value="2012">2012年(平成24年)</MenuItem>
            <MenuItem value="2013">2013年(平成25年)</MenuItem>
            <MenuItem value="2014">2014年(平成26年)</MenuItem>
            <MenuItem value="2015">2015年(平成27年)</MenuItem>
            <MenuItem value="2016">2016年(平成28年)</MenuItem>
            <MenuItem value="2017">2017年(平成29年)</MenuItem>
            <MenuItem value="2018">2018年(平成30年)</MenuItem>
            <MenuItem value="2019">2019年(令和元年)</MenuItem>
            <MenuItem value="2020">2020年(令和2年)</MenuItem>
            <MenuItem value="2021">2021年(令和3年)</MenuItem>
            <MenuItem value="2022">2022年(令和4年)</MenuItem>
            <MenuItem value="2023">2023年(令和5年)</MenuItem>
            <MenuItem value="2024">2024年(令和6年)</MenuItem>
            <MenuItem value="2025">2025年(令和7年)</MenuItem>
            <MenuItem value="2026">2026年(令和8年)</MenuItem>
            <MenuItem value="2027">2027年(令和9年)</MenuItem>
            <MenuItem value="2028">2028年(令和10年)</MenuItem>
            <MenuItem value="2029">2029年(令和11年)</MenuItem>
            <MenuItem value="2030">2030年(令和12年)</MenuItem>
            <MenuItem value="2031">2031年(令和13年)</MenuItem>
            <MenuItem value="2032">2032年(令和14年)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
