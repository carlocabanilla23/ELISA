import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/graph.css';
// ELISA\src\component\styles\graph.css
function GraphReport2 () {
    return (
        <div className="summary">
            <div className="summaryItem">
              <span className="summaryTitle">Low Stock Items</span>
              <span className="summaryCount">10</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Old Items</span>
              <span className="summaryCount">07</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Broken Items</span>
              <span className="summaryCount">08</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Reserved Items</span>
              <span className="summaryCount">25</span>
            </div>
            <div className="summaryItem">
              <span className="summaryTitle">Total Items</span>
              <span className="summaryCount">50</span>
            </div>
          </div>
    );
}

export default GraphReport2;