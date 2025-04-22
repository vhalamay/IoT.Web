using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IoT.Web.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSecretColumnToDevicesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Secret",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Secret",
                table: "Devices");
        }
    }
}
